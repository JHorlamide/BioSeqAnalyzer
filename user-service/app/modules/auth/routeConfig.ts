/* Libraries */
import { Application } from "express";

/* Application Modules */
import config from "../../config/appConfig";
import jwtMiddleware from "../auth/middleware/jwtMiddleware";
import authMiddleware from "../auth/middleware/authMiddleware";
import authController from "../auth/controller/authController";
import { CommonRoutesConfig } from "../../common/CommonRouteConfig";

const APP_PREFIX_PATH = config.prefix;

export class AuthRoute extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, "AuthRoute")
  }

  configureRoutes(): Application {
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

    /***
    * @route  POST /api/user/forgot-password
    * @desc   Forgot password
    * @access Public.
    * ***/
    this.app.post(`${APP_PREFIX_PATH}/users/forgot-password`, [
      authMiddleware.validateForgotPasswordField,
      authController.forgotPassword
    ])

    /***
    * @route  POST /api/user/reset-password
    * @desc   Reset password
    * @access Public.
    * ***/
    this.app.post(`${APP_PREFIX_PATH}/users/reset-password`, [
      authMiddleware.validatePasswordReset,
      authController.resetPassword
    ])

    return this.app;
  }
}
