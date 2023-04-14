import { Request, Response, NextFunction } from "express";
import { logger } from "../../config/logger";
import { AppError } from "./appError";
import responseHandler from "../responseHandler";

const errorMiddleware = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, message, statusCode, isOperational } = error;
  logger.error(`${name} ${message}`, error);

  if (isOperational) {
    return responseHandler.failureResponse(message, res, statusCode)
  }

  return responseHandler.failureResponse(message, res);
}

export default errorMiddleware;
