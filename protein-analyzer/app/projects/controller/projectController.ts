/* Libraries */
import { Request, Response } from "express";

/* Application Modules */
import asyncHandler from "../../common/middleware/asyncHandlerMiddleware";
import projectService from "../services/projectService";
import responseHandler from "../../common/responseHandler";
import config from "../../config/appConfig";
import redisCash from "../RedisCash/redisCash";
import { RES_MSG, ERR_MSG } from "../types/constants";
import { getAuthUser } from "../utils/utils";

class ProjectController {
  public createProject = asyncHandler(async (req: Request, res: Response) => {
    const authUser = getAuthUser(req.headers["x-decoded-user"])
    const { userId } = authUser;
    const project = await projectService.createProject({ authorId: userId, ...req.body });
    responseHandler.successfullyCreated(RES_MSG.PROJECT_CREATED, project, res);
  });

  public getAllProjects = asyncHandler(async (req: any, res: Response) => {
    const DEFAULT_PAGE_SIZE = 1;
    const DEFAULT_LIMIT = 10;

    const decodedUser = JSON.parse(req.headers["x-decoded-user"]);
    const { userId } = decodedUser;

    const {
      page,
      limit,
      projectTitle = "",
      projectGoal = "",
      measuredProperty = ""
    } = req.query;

    const pageNumber = page ? Number(page) : DEFAULT_PAGE_SIZE;
    const limitNumber = limit ? Number(limit) : DEFAULT_LIMIT;
    const searchQuery = projectTitle ? String(projectTitle) : "";

    const paginationParams = {
      page: pageNumber,
      limit: limitNumber
    };

    const searchParams = {
      authorId: userId,
      projectGoal,
      measuredProperty,
      projectTitle: searchQuery,
    };

    const projects = await projectService.getAllProjects(paginationParams, searchParams);
    responseHandler.successResponse(RES_MSG.PROJECTS_FETCHED, projects, res);
  });

  public getProjectDetail = asyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const project = await projectService.getProjectById(projectId);
    responseHandler.successResponse(RES_MSG.PROJECT_FETCHED, project, res);
  });

  public updateProjectDetails = asyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params;

    const updatedProject = await projectService.updateProject({
      projectId,
      projectData: req.body
    });

    responseHandler.successResponse(RES_MSG.PROJECT_UPDATED, updatedProject, res);
  });

  public deleteProject = asyncHandler(async (req: any, res: Response) => {
    const decodedUser = JSON.parse(req.headers["x-decoded-user"]);
    const { userId } = decodedUser;
    const { projectId } = req.params;

    await projectService.deleteProjectAndAssociatedFile(projectId, userId);
    responseHandler.noContentRes(res);
  });

  public deleteAllProject = asyncHandler(async (req: any, res: Response) => {
    const decodedUser = JSON.parse(req.headers["x-decoded-user"]);
    const { userId } = decodedUser;

    await projectService.deleteUserAllProject(userId);
    responseHandler.noContentRes(res);
  });

  public uploadProjectCSV = asyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const file = req.file;

    if (!file) {
      return responseHandler.badRequest(ERR_MSG.NO_FILE_UPLOAD, res);
    }

    const project = await projectService.uploadProjectFile(projectId, file);
    return responseHandler.successResponse(RES_MSG.FILE_UPLOADED, project, res);
  });

  public getSummaryOfMainMatricesData = asyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const { summaryCacheKey, cached_ttl } = config;
    const cacheKey = `${summaryCacheKey}-${projectId}`;

    // Number of sequences with a score above the reference sequence (with value "WT" in "muts" column)
    const numSequencesAboveReference = await projectService.getSequencesAboveReference(projectId);

    // List of the 10 mutants with the highest fitness values
    const topMutants = await projectService.getTopMutants(projectId);

    // Value of the sequence with the highest fitness value
    const highestFitness = await projectService.getHighestFitness(projectId);

    // Fold Improvement over wild type
    const foldImprovement = await projectService.getFoldImprovement(projectId);

    const resData = {
      totalSequence: numSequencesAboveReference.totalSequences,
      topMutants,
      numSequencesAboveReference,
      percentageSequencesAboveReference: numSequencesAboveReference.hitRate,
      highestFitness,
      foldImprovement,
    }

    await redisCash.setCacheData(cacheKey, cached_ttl, resData)
    responseHandler.successResponse(RES_MSG.SUMMARY_FETCHED, resData, res);
  })

  public getTopPerformingVariantsData = asyncHandler(async (req: Request, res: Response) => {
    const { limit } = req.query;
    const { projectId } = req.params;

    const limitNumber = limit ? Number(limit) : 10
    const { topVariantCacheKey, cached_ttl } = config;
    const cachedKey = `${topVariantCacheKey}-${projectId}`;

    const mutationRanges = await projectService.getMutationRange(projectId, limitNumber);
    await redisCash.setCacheData(cachedKey, cached_ttl, mutationRanges);
    responseHandler.successResponse(
      RES_MSG.TOP_PERFORMING_VARIANTS_FETCHED,
      { mutationRanges }, res);
  })

  public getScoreDistribution = asyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const { scoreDistributionKey, cached_ttl } = config;
    const cachedKey = `${scoreDistributionKey}-${projectId}`;

    // Distribution of fitness scores as a histogram
    // The reference sequence should be highlighted in the histogram
    const scoreDistribution = await projectService.getHistogramData(projectId);

    await redisCash.setCacheData(cachedKey, cached_ttl, scoreDistribution);
    responseHandler.successResponse(RES_MSG.HISTOGRAM_DATA, scoreDistribution, res);
  })

  public processCVSFile = asyncHandler(async (req: Request, res: Response) => {
    const { limit } = req.query;
    const { projectId } = req.params;
    const limitNumber = limit ? Number(limit) : 10;

    // 1. Distribution of fitness scores as a histogram
    // The reference sequence should be highlighted in the histogram
    const histogramWithReference = projectService.getHistogramData(projectId);

    // 2. List of the 10 mutants with the highest fitness values
    const topMutants = await projectService.getTopMutants(projectId);

    // 3. Distribution of the number of mutations per sequence
    const mutationDistribution = await projectService.getMutationDistribution(projectId);

    // 4. For each individual mutation, the range of scores for sequences that include this mutation
    const mutationRanges = await projectService.getMutationRange(projectId, limitNumber);

    // 5. Number of sequences with a score above the reference sequence (with value "WT" in "muts" column)
    const numSequencesAboveReference = await projectService.getSequencesAboveReference(projectId);

    // 6. Value of the sequence with the highest fitness value
    const highestFitness = await projectService.getHighestFitness(projectId);

    // 7. Fold Improvement over wild type
    const foldImprovement = await projectService.getFoldImprovement(projectId);

    responseHandler.successResponse("Data fetched for rendering", {
      topMutants,
      foldImprovement,
      mutationRanges,
      highestFitness,
      mutationDistribution,
      numSequencesAboveReference,
      histogramData: histogramWithReference,
      totalSequence: numSequencesAboveReference.totalSequences,
      percentageSequencesAboveReference: numSequencesAboveReference.hitRate,
    }, res);
  })
}

export default new ProjectController();
