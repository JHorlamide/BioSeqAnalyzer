/* Libraries */
import { NextFunction, Request, Response } from "express"

/* Application Modules */
import responseHandler from "../config/responseHandler";
import { logger } from "../config/logger";

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  logger.error(error.stack);
  responseHandler.serverError("Internal Server Error", res)
}