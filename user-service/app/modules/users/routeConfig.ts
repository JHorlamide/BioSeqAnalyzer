/* Libraries */
import { Application } from "express";

/* Application Modules */
import config from "../../config/appConfig";
import userMiddleware from "./middleware/userMiddleware";
import userController from "./controller/userController";
import jwtMiddleware from "../auth/middleware/jwtMiddleware";
import { CommonRoutesConfig } from "../../common/CommonRouteConfig";

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
    * @route POST /api/users/invite
    * @desc  Invite user to project
    * @access Private
    */
    this.app.post(`${APP_PREFIX_PATH}/users/invite`, [
      jwtMiddleware.validJWTNeeded,
      userMiddleware.validateUserHasRequiredRole,
      userMiddleware.validateInvitationReqBody,
      userController.inviteUserToProject
    ])
   
    /**
    * @route POST /api/users/invite/accept
    * @desc  Accept Invitation
    * @access Private
    */
    this.app.post(`${APP_PREFIX_PATH}/users/invite/accept`, [
      userMiddleware.validateAcceptBody,
      userController.acceptProjectInvitation
    ])

    return this.app;
  }
}
