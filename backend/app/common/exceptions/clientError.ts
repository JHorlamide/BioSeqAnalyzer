import { CustomError } from "./customError";

//Handles status code 400 errors.
export class ClientError extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}