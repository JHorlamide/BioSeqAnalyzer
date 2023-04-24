import httpStatus from "http-status";

export const RES_MSG = {
  USER_CREATE: "User register successfully"
}

export const ERR_MSG = {
  USER_NOT_FOUND: "User not found",
  EMAIL_REQUIRED: "Email is required",
  USER_EXIT: "User already exits",
  REQUIRED_CREATE_FIELD: "name, email, and, password are required fields"
}

export const ERROR_MESSAGES = {
  REQUIRED_USER_FIELDS: {
    name: "InvalidInputError",
    statusCode: httpStatus.BAD_REQUEST,
    message: "name, email, and, password are required fields"
  },

  INVALID_EMAIL_ERROR: {
    name: 'InvalidEmailError',
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Email is required',
  },

  USER_FOUND_ERROR: {
    name: 'UserNotFoundError',
    statusCode: httpStatus.NOT_FOUND,
    message: 'User not found',
  },

  UNAUTHORIZED_ERROR: {
    name: 'UnauthorizedError',
    statusCode: httpStatus.UNAUTHORIZED,
    message: 'Unauthorized access',
  },
};