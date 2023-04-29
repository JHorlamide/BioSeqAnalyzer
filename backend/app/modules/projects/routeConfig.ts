import { Application } from "express";
import { CommonRoutesConfig } from "../../common/CommonRouteConfig";
import { APP_PREFIX_PATH } from "../../constants/AppConstants";
import jwtMiddleware from "../auth/middleware/jwtMiddleware";
import projectController from "./controller/projectController";
import projectMiddleware from "./middleware/projectMiddleware";

export class ProjectRoute extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, "ProjectRoute");
  }

  configureRoutes(): Application {
    /***
    * @route /api/projects
    * @desc Create new project
    * @access Private
    * ***/
    this.app.post(`${APP_PREFIX_PATH}/projects`, [
      jwtMiddleware.validJWTNeeded,
      projectMiddleware.validateRequestBodyField,
      projectController.createProject
    ])

    /***
    * @route /api/projects/uniprot/:uniprotId
    * @desc Get Protein Sequence
    * @access Private
    * ***/
    this.app.get(`${APP_PREFIX_PATH}/projects/uniprot/:uniprotId`, [
      jwtMiddleware.validJWTNeeded,
      projectMiddleware.validateReqParam,
      projectController.getProteinSequence
    ])

    /***
    * @route /api/projects
    * @desc Get All Projects
    * @access Private
    * ***/
    this.app.get(`${APP_PREFIX_PATH}/projects`, [
      jwtMiddleware.validJWTNeeded,
      projectController.getProjects
    ])

    /***
    * @route /api/projects/:projectId
    * @desc Get Project Details
    * @access Private
    * ***/
    this.app.get(`${APP_PREFIX_PATH}/projects/:projectId`, [
      jwtMiddleware.validJWTNeeded,
      projectController.getProjectDetail
    ])

    return this.app;
  }
}