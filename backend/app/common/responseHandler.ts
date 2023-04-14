import { Response } from "express";
import HttpStatus, { } from "http-status";
import { HttpStatusCode } from "./types";

/**
 * A class for handling HTTP responses with generic data type T.
 * Provides methods for successful, failure, and error responses.
 */
class ResponseHandler<T extends object> {
  public successfullyCreated(message: string, data: T, res: Response): Response {
    return res
      .status(HttpStatus.CREATED)
      .json({ status: "Success", message, data })
  }

  public successResponse(message: string, data: T, res: Response): Response {
    return res
      .status(HttpStatus.OK)
      .json({ status: "Success", message, data })
  }

  public failureResponse(
    message: string,
    res: Response,
    statusCode: HttpStatusCode = HttpStatus.BAD_REQUEST
  ): Response {
    return res
      .status(statusCode)
      .json({ status: "Failure", message })
  }

  public unAuthorizedResponse(message: string, res: Response): Response {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ status: "Failure", message })
  }

  public forbiddenResponse(message: string, res: Response): Response {
    return res
      .status(HttpStatus.FORBIDDEN)
      .json({ status: "Failure", message })
  }
}

export default new ResponseHandler();
