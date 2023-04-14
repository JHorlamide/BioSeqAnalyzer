import httpStatus from "http-status";

export enum HttpStatusCode {
  OK = httpStatus.OK,
  BAD_REQUEST = httpStatus.BAD_REQUEST,
  NOT_FOUND = httpStatus.NOT_FOUND,
  INTERNAL_SERVER = httpStatus.INTERNAL_SERVER_ERROR,
}