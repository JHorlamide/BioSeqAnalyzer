import { Application } from "express";
import { CommonRoutesConfig } from "../../common/CommonRouteConfig";
import jwtMiddleware from "../auth/middleware/jwtMiddleware";
import projectController from "./controller/projectController";
import projectMiddleware from "./middleware/projectMiddleware";
import config from "../../config/appConfig";

const APP_PREFIX_PATH = config.prefix;

export class ProjectRoute extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, "ProjectRoute");
  }

  configureRoutes(): Application {
    /***
    * @route POST: /api/projects
    * @desc Create new project
    * @access Private
    * ***/
    this.app.post(`${APP_PREFIX_PATH}/projects`, [
      jwtMiddleware.validJWTNeeded,
      projectMiddleware.validateRequestBodyField,
      projectController.createProject
    ])

    /***
    * @route GET: /api/projects
    * @desc Get All Projects
    * @access Private
    * ***/
    this.app.get(`${APP_PREFIX_PATH}/projects`, [
      jwtMiddleware.validJWTNeeded,
      projectMiddleware.validatePaginationParams,
      projectController.getAllProjects
    ])

    /***
    * @route GET: /api/projects/:projectId
    * @desc  Get Project Details
    * @access Private
    * ***/
    this.app.get(`${APP_PREFIX_PATH}/projects/:projectId`, [
      jwtMiddleware.validJWTNeeded,
      projectController.getProjectDetail
    ])

    /***
    * @route PUT: /api/projects/:projectId
    * @desc Update Project Details
    * @access Private
    * ***/
    this.app.put(`${APP_PREFIX_PATH}/projects/:projectId`, [
      jwtMiddleware.validJWTNeeded,
      projectMiddleware.validateProjectBelongsToUser,
      projectMiddleware.validateRequestBodyField,
      projectController.updateProjectDetails
    ])

    /***
    * @route GET: /api/uniprot/:uniprotId
    * @desc Get Protein Sequence
    * @access Private
    * ***/
    this.app.get(`${APP_PREFIX_PATH}/uniprot/:uniprotId`, [
      jwtMiddleware.validJWTNeeded,
      projectMiddleware.validateReqParam,
      projectController.getProteinSequence
    ])

    return this.app;
  }
}