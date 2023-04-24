import { Request, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import responseHandler from "../../../common/responseHandler";
import asyncHandler from "../../../common/asyncHandler";
import { JWT_SECRETE, TOKEN_EXPIRATION } from "../../../config/environmentConfig";

class AuthController {
  public createUserJWT = asyncHandler(async (req: Request, res: Response) => {
    const refreshId = req.body.userId + JWT_SECRETE;
    const salt = crypto.createSecretKey(crypto.randomBytes(16));
    const hash = crypto
      .createHmac("sha512", salt)
      .update(refreshId)
      .digest("base64");

    req.body.refreshKey = salt.export();
    const accessToken = jwt.sign(
      req.body,
      JWT_SECRETE,
      { expiresIn: TOKEN_EXPIRATION }
    );

    delete req.body.refreshKey;

    const userAuth = { accessToken, refreshToken: hash, user: req.body };
    responseHandler.successResponse("User Authenticated", userAuth, res);
  })
}

export default new AuthController();
