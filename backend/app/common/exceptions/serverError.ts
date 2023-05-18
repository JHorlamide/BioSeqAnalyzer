import httpStatus from "http-status";
import { CustomError } from "./customError";

export class ServerError extends CustomError {
  constructor(message: string, additionalInfo?: any) {
    super(message, httpStatus.INTERNAL_SERVER_ERROR, additionalInfo);
  }
}