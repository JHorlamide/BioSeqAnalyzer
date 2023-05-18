import { CustomError } from "./customError";
import httpStatus from "http-status";

// Handles status code 403 errors.
export class ForbiddenError extends CustomError {
  constructor(message: string) {
    super(message, httpStatus.FORBIDDEN);
  }
}