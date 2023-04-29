import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { JWT_SECRETE } from "../../../config/environmentConfig";
import { Jwt } from "../types/authTypes";
import responseHandler from "../../../common/responseHandler";
import userService from "../../users/services/userService";
import requestBodyValidator from "../../../common/requestValidation";
import { tokenRefresh } from "../validation/authSchema";
import { AppError } from "../../../common/middleware/appError";
import { ERROR_MESSAGES } from "../../users/types/constants";

class JwtMiddleware {
  public verifyRefreshBodyField = requestBodyValidator(tokenRefresh);

  public validJWTNeeded(req: Request, res: Response, next: NextFunction) {
    if (req.headers["authorization"]) {
      try {
        const authorization = req.headers["authorization"].split(" ");

        if (authorization[0] !== "Bearer") {
          return responseHandler.unAuthorizedResponse("Invalid authorization token", res);
        }

        res.locals.jwt = jwt.verify(authorization[1], JWT_SECRETE) as Jwt;
        return next();
      } catch (error: any) {
        return responseHandler
          .forbiddenResponse(`Not authorized ${error}`, res);
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
      .update(userId + JWT_SECRETE)
      .digest("base64");

    if (!user) {
      const { name, statusCode, message } = ERROR_MESSAGES.USER_FOUND_ERROR;
      throw new AppError(name, statusCode, message, true);
    }

    if (hash === refreshToken) {
      req.body = {
        _id: user.id,
        name: user.fullName,
        email: user.email
      }

      return next();
    }

    responseHandler.failureResponse("Invalid refresh token", res);
  }
}

export default new JwtMiddleware();
