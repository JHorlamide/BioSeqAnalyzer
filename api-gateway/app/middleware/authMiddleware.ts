import {NextFunction, Request, Response} from "express";
import jwt from 'jsonwebtoken';
import responseHandler from "../config/responseHandler";
import config from "../config/serverConfig";

export type Jwt = {
  _id: string;
  userId: string;
  refreshKey: string;
};

export const validJWTNeeded = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return responseHandler.unAuthorizedResponse("Gateway authorization denied", res);
  }

  const authToken = authHeader.split(" ")[1];

  try {
    const decodedAuthToken = jwt.verify(authToken, config.jwt.secret) as Jwt;
    req.headers["X-Decoded-User"] = JSON.stringify(decodedAuthToken);

    next();
  } catch (error: any) {
    return responseHandler.forbiddenResponse(`Not authorize ${error}`, res);
  }
}
