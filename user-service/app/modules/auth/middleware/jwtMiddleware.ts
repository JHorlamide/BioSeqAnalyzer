/* Libraries */
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

/* Application Modules */
import config from "../../../config/appConfig";
import responseHandler from "../../../common/responseHandler";
import userService from "../../users/services/userService";
import requestBodyValidator from "../../../common/middleware/requestValidation";
import { tokenRefresh } from "../validation/authSchema";
import { Jwt } from "../types/authTypes";
import { ERR_MSG } from "../../users/types/constants";


class JwtMiddleware {
  public verifyRefreshBodyField = requestBodyValidator(tokenRefresh);

  public validJWTNeeded(req: Request, res: Response, next: NextFunction) {
    if (req.headers["authorization"]) {
      try {
        const authorization = req.headers["authorization"].split(" ");

        if (authorization[0] !== "Bearer") {
          return responseHandler.unAuthorizedResponse("Invalid authorization token", res);
        }

        res.locals.jwt = jwt.verify(authorization[1], config.jwt.secret) as Jwt;
        return next();
      } catch (error: any) {
        return responseHandler.forbiddenResponse(`Not authorize ${error}`, res);
      }
    }

    responseHandler.unAuthorizedResponse("Authorization denied", res);
  }

  public async validRefreshNeeded(req: Request, res: Response, next: NextFunction) {
    const { email, refreshKey, userId } = res.locals.jwt;
    const { refreshToken } = req.body;

    const user = await userService.getUserByEmail(email);
    const salt = crypto.createSecretKey(Buffer.from(refreshKey.data));
    const hash = crypto
      .createHmac("sha512", salt)
      .update(userId + config.jwt.secret)
      .digest("base64");

    if (!user) {
      return responseHandler.badRequest(ERR_MSG.USER_NOT_FOUND, res);
      // throw new NotFoundError(ERR_MSG.USER_NOT_FOUND);
    }

    if (hash === refreshToken) {
      req.body = {
        _id: user.id,
        name: user.fullName,
        email: user.email
      }

      return next();
    }

    responseHandler.badRequest("Invalid refresh token", res);
  }
}

export default new JwtMiddleware();
