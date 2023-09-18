/* Libraries */
import { Request, Response, NextFunction } from "express";

/* Application Module */
import responseHandler from "../responseHandler";
import { APIError } from "../exceptions/customError";

export function errorHandler(error: APIError, req: Request, res: Response, next: NextFunction) {
  const statusCode = error.statusCode;

  const resBody = {
    success: false,
    message: error.message,
  }

  return responseHandler.customResponse(statusCode, resBody, res);
}