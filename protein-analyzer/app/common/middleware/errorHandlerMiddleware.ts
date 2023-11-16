/* Libraries */
import { Request, Response, NextFunction } from "express";

/* Application Module */
import responseHandler from "../responseHandler";
import { APIError } from "../exceptions/ApiError";
import { logger } from "../../config/logger";

export function errorHandler(error: APIError, req: Request, res: Response, next: NextFunction) {
  const defaultError = {
    statusCode: error.statusCode || 500,
    status: "Failure",
    message: error.message || "Server error. Please try again later",
    stack: error.stack,
  }

  const errorObject = Object.assign({}, defaultError, error);

  logger.info(error.stack);
  return responseHandler.customResponse(errorObject.statusCode, errorObject, res);
}

export const routeNotFoundErrorHandler = (req: Request, res: Response, next: NextFunction) => {
  responseHandler.customResponse(404, { message: "Route not found" }, res);
  return next();
}
