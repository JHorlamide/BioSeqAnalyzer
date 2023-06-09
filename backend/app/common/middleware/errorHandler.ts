import { Request, Response, NextFunction } from "express";
import { CustomError, IResponseError } from "../exceptions/customError";
import responseHandler from "../responseHandler";

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  if (!(error instanceof CustomError)) {
    return responseHandler.serverError(`Server error, please try again later`, res);
  }

  const customError = error as CustomError;
  let response = { message: customError.message } as IResponseError;

  // Check if there is more info to return.
  if (customError.additionalInfo) response.additionalInfo = customError.additionalInfo;
  responseHandler.customResponse(customError.status, response, res);
}