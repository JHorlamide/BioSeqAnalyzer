/* Libraries */
import { Application } from "express";

/* Application Modules */
import config from "../config/appConfig";
import projectController from "./controller/projectController";
import projectMiddleware from "./middleware/projectMiddleware";
import cacheMiddleware from "./middleware/redisCacheMiddleware";
import { CommonRoutesConfig } from "../common/CommonRouteConfig";

const APP_PREFIX_PATH = config.prefix;

export class ProjectRoute extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, "ProjectRoute");
  }

  configureRoutes(): Application {
    /***
    * @route POST: /api/protein-projects
    * @desc Create new project.
    * @access Private.
    * ***/
    this.app.post(`${APP_PREFIX_PATH}/protein-projects`, [
      projectMiddleware.validateRequestBodyField,
      projectController.createProject
    ])

    /***
    * @route GET: /api/protein-projects
    * @desc Get All Projects.
    * @access Private.
    * ***/
    this.app.get(`${APP_PREFIX_PATH}/protein-projects`, [
      projectMiddleware.validatePaginationParams,
      projectController.getAllProjects
    ])

    /***
    * @route GET: /api/protein-projects/:projectId
    * @desc  Get Project Details
    * @access Private
    * ***/
    this.app.get(`${APP_PREFIX_PATH}/protein-projects/:projectId`, [
      projectMiddleware.validateProjectExist,
      projectMiddleware.validateProjectBelongsToUser,
      projectController.getProjectDetail
    ])

    /***
    * @route PUT: /api/protein-projects/:projectId
    * @desc Update Project Details
    * @access Private
    * ***/
    this.app.put(`${APP_PREFIX_PATH}/protein-projects/:projectId`, [
      projectMiddleware.validateProjectExist,
      projectMiddleware.validateProjectBelongsToUser,
      projectMiddleware.validateRequestBodyField,
      projectController.updateProjectDetails
    ])

    /***
    * @route DELETE: /api/protein-projects/:projectId
    * @desc Delete Project.
    * @access Private.
    * ***/
    this.app.delete(`${APP_PREFIX_PATH}/protein-projects/:projectId`, [
      projectMiddleware.validateProjectExist,
      projectMiddleware.validateProjectBelongsToUser,
      projectController.deleteProject
    ])

    /***
    * @route  POST: /api/protein-projects/:projectId/csv-upload
    * @desc   Upload project experimental data.
    * @access Private.
    * ***/
    this.app.post(`${APP_PREFIX_PATH}/protein-projects/:projectId/csv-upload`, [
      projectMiddleware.validateProjectExist,
      projectMiddleware.validateProjectBelongsToUser,
      projectMiddleware.validateUploadReq,
      projectController.uploadProjectCSV
    ])

    /***
    * @route GET: /api/protein-projects/:projectId/summary-table-of-main-matrices
    * @desc Get summary of main matrices data from CSV.
    * @access Private.
    * ***/
    this.app.get(`${APP_PREFIX_PATH}/protein-projects/:projectId/summary-table-of-main-matrices`, [
      projectMiddleware.validateProjectExist,
      projectMiddleware.validateProjectBelongsToUser,
      cacheMiddleware.getCachedSummaryData,
      projectController.getSummaryOfMainMatricesData
    ])

    /***
    * @route GET: /api/protein-projects/:projectId/top-performing-variants
    * @desc Get top performing variants data from CSV.
    * @access Private.
    * ***/
    this.app.get(`${APP_PREFIX_PATH}/protein-projects/:projectId/top-performing-variants`, [
      projectMiddleware.validateProjectExist,
      projectMiddleware.validateProjectBelongsToUser,
      cacheMiddleware.getCachedTopPermingVariantData,
      projectController.getTopPerformingVariantsData
    ])

    /***
    * @route GET: /api/protein-projects/:projectId/score-distribution
    * @desc Get top score distribution data from CSV.
    * @access Private.
    * ***/
    this.app.get(`${APP_PREFIX_PATH}/protein-projects/:projectId/score-distribution`, [
      projectMiddleware.validateProjectExist,
      projectMiddleware.validateProjectBelongsToUser,
      cacheMiddleware.getCachedScoreDistribution,
      projectController.getScoreDistribution
    ]);

    return this.app;
  }
}