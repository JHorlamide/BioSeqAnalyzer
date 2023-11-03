/* Libraries */
import { Application } from "express";

/* Application Modules */
import config from "../../config/appConfig";
import userMiddleware from "./middleware/userMiddleware";
import userController from "./controller/userController";
import jwtMiddleware from "../auth/middleware/jwtMiddleware";
import { CommonRoutesConfig } from "../../common/CommonRouteConfig";
import authMiddleware from "../auth/middleware/authMiddleware";

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

    /**
    * @route POST /api/users/:userId/invite-to-project
    * @desc  Invite user to project
    * @access Private
    */
    this.app.post(`${APP_PREFIX_PATH}/users/:userId/invite-to-project`, [
      jwtMiddleware.validJWTNeeded,
      userMiddleware.validateUserHasRequiredRole,
      userMiddleware.validateUserAlreadyExit,
      userController.inviteUserToProject
    ])

    return this.app;
  }
}
