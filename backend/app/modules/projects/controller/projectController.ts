import { Request, Response } from "express";
import asyncHandler from "../../../common/middleware/asyncHandler";
import projectService from "../services/projectService";
import responseHandler from "../../../common/responseHandler";
import { RES_MSG } from "../types/constants";
import uniprotService from "../services/uniprot.service";
import csvParser from "csv-parser";
import { Readable } from "stream";
import { ServerError } from "../../../common/exceptions/serverError";
import { ClientError } from "../../../common/exceptions/clientError";

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
    const { projectId } = req.body;

    if (!req.file) {
      return responseHandler.failureResponse("No file uploaded", res);
    }

    try {
      // Read and parse the CSV file
      const csvData = await projectService.parseCSVFile(req.file.buffer);

      // Validate the CSV structure
      if (!projectService.validateCSVStructure(csvData)) {
        return responseHandler.failureResponse("CSV file must contain columns: sequence, fitness, muts", res);
      }

      // Check for wild type sequence
      if (!projectService.hasWildTypeSequence(csvData)) {
        return responseHandler.failureResponse("CSV file must contain at least one row with muts = WT", res);
      }

      // Update the project with the new projectFile data
      const uploadResult = await projectService.uploadProjectFile(projectId, csvData);
      return responseHandler.successResponse("File uploaded and data saved successfully", uploadResult, res);
    } catch (error: any) {
      console.error(error.message);
      return responseHandler.failureResponse(`Error processing CSV file: ${error.message}`, res);
    }
  })
}

export default new ProjectController();
