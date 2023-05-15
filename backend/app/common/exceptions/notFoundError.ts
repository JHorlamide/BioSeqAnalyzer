import { CustomError } from "./customError";

// Handles status code 404 errors.
export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 404);
  }
}