import { CustomError } from "./customError";
import httpStatus from "http-status";

// Handles status code 401 errors.
export class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(message, httpStatus.UNAUTHORIZED);
  }
}