import { Application } from "express";
import { CommonRoutesConfig } from "../../common/CommonRouteConfig";
import { APP_PREFIX_PATH } from "../../constants/AppConstants";

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
    this.app.post(`${APP_PREFIX_PATH}/projects`, [])
    return this.app;    
  }
}