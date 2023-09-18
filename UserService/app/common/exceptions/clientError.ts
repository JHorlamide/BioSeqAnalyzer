import { CustomError } from "./customError";
import httpStatus from "http-status";

//Handles status code 400 errors.
export class ClientError extends CustomError {
  constructor(message: string) {
    super(message, httpStatus.BAD_REQUEST);
  }
}