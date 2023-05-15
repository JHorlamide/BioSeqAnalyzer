import { CustomError } from "./customError";

// Handles status code 403 errors.
export class ForbiddenError extends CustomError {
  constructor(message: string) {
    super(message, 403);
  }
}