import { HttpStatusCode } from "../types";

interface IAppError {
  name: string;
  statusCode: HttpStatusCode;
  message: string;
  isOperational: boolean;
}

export class AppError extends Error implements IAppError {
  public readonly name: string;
  public readonly statusCode: HttpStatusCode
  public isOperational: boolean;

  constructor(
    name: string,
    statusCode: HttpStatusCode,
    message: string,
    isOperational: boolean
  ) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}
