import { Request, Response } from "express";
import asyncHandler from "../../../common/middleware/asyncHandler";
import projectService from "../services/projectService";
import responseHandler from "../../../common/responseHandler";
import { RES_MSG, ERR_MSG } from "../types/constants";
import uniprotService from "../services/uniprot.service";
import csvParser from "csv-parser";
import config from "../../../config/appConfig";
import s3Service from "../../s3Service/s3Service";
import { CSVColumnDataType } from "../types/types";

class ProjectController {
  public createProject = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = res.locals.jwt;
    const project = await projectService.createProject({ user: userId, ...req.body });
    responseHandler.successfullyCreated(RES_MSG.PROJECT_CREATED, project, res);
  })

  public getProteinSequence = asyncHandler(async (req: Request, res: Response) => {
    const { uniprotId } = req.params;
    const proteinSequence = await uniprotService.getProteinSequence(uniprotId);
    responseHandler.successResponse(RES_MSG.PROTEIN_SEQUENCE_FETCHED, proteinSequence, res);
  })

  public getAllProjects = asyncHandler(async (req: Request, res: Response) => {
    const { page, limit, search } = req.query;
    const { userId } = res.locals.jwt;

    const pageNumber = page ? Number(page) : 1;
    const limitNumber = limit ? Number(limit) : 10;
    const searchString = search ? String(search) : "";

    const getProjectPrams = {
      userId,
      page: pageNumber,
      limit: limitNumber,
      search: searchString
    }

    const projects = await projectService.getAllProjects(getProjectPrams);
    responseHandler.successResponse(RES_MSG.PROJECTS_FETCHED, projects, res);
  })

  public getProjectDetail = asyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const project = await projectService.getProjectById(projectId);
    responseHandler.successResponse(RES_MSG.PROJECT_FETCHED, project, res);
  })

  public updateProjectDetails = asyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const updatedProject = await projectService.updateProject({ projectId, projectData: req.body });
    responseHandler.successResponse(RES_MSG.PROJECT_UPDATED, updatedProject, res);
  })

  public deleteProject = asyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params;
    await projectService.deleteProject(projectId);
    responseHandler.noContent(RES_MSG.PROJECT_DELETED, res);
  })

  public uploadProjectCSV = asyncHandler(async (req: Request, res: Response) => {
    const file = req.file;
    const { projectId } = req.params;

    if (!file) {
      return responseHandler.badRequest(ERR_MSG.NO_FILE_UPLOAD, res);
    }

    const response = await s3Service.uploadFile(file)
    const uploadRes = {
      fileName: file.originalname,
      Bucket: response.Bucket,
      Key: response.Key,
    }

    // Update the project with the new projectFile data
    const uploadResult = await projectService.uploadProjectFile(projectId, uploadRes);
    return responseHandler.successResponse(RES_MSG.FILE_UPLOADED, uploadResult, res);
  })

  public processCVSFile = asyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params;

    const project = await projectService.getProjectById(projectId);
    const { projectFile } = project;

    const s3ReadStream = s3Service.getFile(projectFile.Key);
    const csvData = await projectService.parseS3ReadStream(s3ReadStream);

    try {
      const totalSequence = projectService.getTotalNumberOfSequence(csvData);
      // 1. Distribution of fitness scores as a histogram
      // The reference sequence should be highlighted in the histogram
      const histogramWithReference = projectService.getHistogramData(csvData);

      // 2. List of the 10 mutants with the highest fitness values
      const topMutants = projectService.getTopMutants(csvData);

      // 3. Distribution of the number of mutations per sequence
      const mutationDistribution = projectService.getMutationDistribution(csvData);

      // 4. For each individual mutation, the range of scores for sequences that include this mutation
      const mutationRanges = projectService.getMutationRange(csvData);

      // 5. Number of sequences with a score above the reference sequence (with value "WT" in "muts" column)
      const numSequencesAboveReference = projectService.getSequencesAboveReference(csvData);

      // 6. Value of the sequence with the highest fitness value
      const highestFitness = projectService.getHighestFitness(csvData);

      // 7. Fold Improvement over wild type
      const foldImprovement = projectService.getFoldImprovement(csvData);

      responseHandler.successResponse("Data fetched for rendering", {
        histogramData: histogramWithReference,
        totalSequence,
        topMutants,
        mutationDistribution,
        mutationRanges,
        numSequencesAboveReference,
        percentageSequencesAboveReference: numSequencesAboveReference.hitRate,
        highestFitness,
        foldImprovement,
      }, res);
    } catch (error: any) {
      return responseHandler.serverError(error.message, res);
    }
  })
}

export default new ProjectController();
