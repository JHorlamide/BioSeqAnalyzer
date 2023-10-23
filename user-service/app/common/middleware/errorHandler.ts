import { Request, Response, NextFunction } from "express";
import { ApiError } from "../exceptions/ApiError";
import responseHandler from "../responseHandler";

export function errorHandler(error: ApiError, req: Request, res: Response, next: NextFunction) {
  const statusCode = error.status;

  const resBody = {
    success: false,
    message: error.message,
  }

  responseHandler.customResponse(statusCode, resBody, res);
}