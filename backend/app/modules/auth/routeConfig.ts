import { Application } from "express";
import { CommonRoutesConfig } from "../../common/CommonRouteConfig";
import authMiddleware from "./middleware/authMiddleware";
import jwtMiddleware from "./middleware/jwtMiddleware"
import { APP_PREFIX_PATH } from "../../constants/AppConstants";
import authController from "./controller/authController";

export class AuthRoute extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, "AuthRoute")
  }

  configureRoutes() {
    /***
    * @route  POST /api/auth/login.
    * @desc    User authentication.
    * @access  Public.
    * ***/
    this.app.post(`${APP_PREFIX_PATH}/auth/login`, [
      authMiddleware.validateReqAuthFields,
      authMiddleware.verifyPassword,
      authController.createUserJWT
    ])

    /***
    * @route  POST /api/auth/refresh-token.
    * @desc   Get authentication refresh token.
    * @access Private.
    * ***/
    this.app.post(`${APP_PREFIX_PATH}/auth/refresh-token`, [
      jwtMiddleware.validJWTNeeded,
      jwtMiddleware.verifyRefreshBodyField,
      jwtMiddleware.validRefreshNeeded,
      authController.createUserJWT
    ])

    return this.app;
  }
}