import { Application } from "express";
import { CommonRoutesConfig } from "../../common/CommonRouteConfig"
import userMiddleware from "./middleware/userMiddleware";
import userController from "./controller/userController";
import config from "../../config/appConfig";
import authMiddleware from "../auth/middleware/authMiddleware";
import authController from "../auth/controller/authController";
import jwtMiddleware from "../auth/middleware/jwtMiddleware";

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

     /***
    * @route  POST /api/users/login.
    * @desc    User authentication.
    * @access  Public.
    * ***/
     this.app.post(`${APP_PREFIX_PATH}/users/login`, [
      authMiddleware.validateReqAuthFields,
      authMiddleware.verifyPassword,
      authController.createUserJWT
    ])

    /***
    * @route  POST /api/user/refresh-token.
    * @desc   Get authentication refresh token.
    * @access Private.
    * ***/
    this.app.post(`${APP_PREFIX_PATH}/users/refresh-token`, [
      jwtMiddleware.validJWTNeeded,
      jwtMiddleware.verifyRefreshBodyField,
      jwtMiddleware.validRefreshNeeded,
      authController.createUserJWT
    ])

    return this.app
  }
}

