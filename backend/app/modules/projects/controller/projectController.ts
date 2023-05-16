import { Request, Response } from "express";
import asyncHandler from "../../../common/middleware/asyncHandler";
import projectService from "../services/projectService";
import responseHandler from "../../../common/responseHandler";
import { RES_MSG } from "../types/constants";
import uniprotService from "../services/uniprot.service";

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
}

export default new ProjectController();
