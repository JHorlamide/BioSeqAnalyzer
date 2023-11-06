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
  }

  const errorObject = Object.assign({}, defaultError, error);

  logger.info(error.stack);
  return responseHandler.customResponse(errorObject.statusCode, errorObject, res);
}

// const errorObj = {
//   status: false,
//   message: error.message,
//   statusCode: error.statusCode
// }