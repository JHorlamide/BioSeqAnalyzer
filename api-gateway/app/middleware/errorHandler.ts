import { NextFunction, Request, Response } from "express"
import responseHandler from "../config/responseHandler";

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  console.error(error.stack);
  responseHandler.serverError("Internal Server Error", res)
}