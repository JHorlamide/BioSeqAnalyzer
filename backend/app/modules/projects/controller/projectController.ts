import { Request, Response } from "express";
import asyncHandler from "../../../common/asyncHandler";
import projectService from "../services/projectService";
import responseHandler from "../../../common/responseHandler";
import { RES_MSG } from "../types/constants";
import uniprotService from "../services/uniprot.service";
import { UPGRADE_REQUIRED } from "http-status";

class ProjectController {
  public createProject = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = res.locals.jwt;

    try {
      const project = await projectService.createProject({ user: userId, ...req.body });
      responseHandler.successfullyCreated(RES_MSG.projectCreated, project, res);
    } catch (error: any) {
      return responseHandler.failureResponse(error.message, res);
    }
  })

  public getProteinSequence = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { uniprotId } = req.params;
      const proteinSequence = await uniprotService.getProteinSequence(uniprotId);
      responseHandler.successResponse(RES_MSG.proteinSequenceFetched, proteinSequence, res);
    } catch (error: any) {
      return responseHandler.failureResponse(error.message, res);
    }
  })

  public getAllProjects = asyncHandler(async (req: Request, res: Response) => {
    try {
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
      responseHandler.successResponse(RES_MSG.projectFetched, projects, res);
    } catch (error: any) {
      return responseHandler.failureResponse(error.message, res);
    }
  })

  public getProjectDetail = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;
      const project = await projectService.getProjectById(projectId);
      responseHandler.successResponse(RES_MSG.projectFetched, project, res);
    } catch (error: any) {
      return responseHandler.failureResponse(error.message, res);
    }
  })

  public updateProjectDetails = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;
      console.log({ controllerLevel: projectId })
      const updatedProject = await projectService.updateProject({ projectId, projectData: req.body });
      responseHandler.successResponse(RES_MSG.projectUpdated, updatedProject, res);
    } catch (error: any) {
      return responseHandler.failureResponse(error.message, res);
    }
  })
}

export default new ProjectController();
