import { CustomError } from "./customError";

// Handles status code 401 errors.
export class UnauthorizedError extends CustomError {
  constructor(message: string) {
      super(message, 401);
  }
}