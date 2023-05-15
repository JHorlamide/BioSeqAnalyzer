import { Application } from "express";
import { CommonRoutesConfig } from "../../common/CommonRouteConfig"
import userMiddleware from "./middleware/userMiddleware";
import userController from "./controller/userController";
import config from "../../config/appConfig";

const APP_PREFIX_PATH = config.prefix;

export class UserRoute extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, "UserRoute")
  }

  configureRoutes(): Application {
    /**
     * @route POST /api/users/register
     * @desc  Register user
     * @access Public
    */
    this.app.post(`${APP_PREFIX_PATH}/users/register`, [
      userMiddleware.validateReqBodyField,
      userMiddleware.validateUserAlreadyExit,
      userController.createUser
    ])

    return this.app
  }
}

