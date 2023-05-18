import { CustomError } from "./customError";
import httpStatus from "http-status";

// Handles status code 404 errors.
export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, httpStatus.NOT_FOUND);
  }
}