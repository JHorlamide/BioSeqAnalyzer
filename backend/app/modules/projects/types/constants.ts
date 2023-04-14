import httpStatus from "http-status";

export const RES_MSG = {
  projectCreated: "Project created successfully",
  projectNotFound: "Project not found"
}

export const ERR_MSG = {
  requiredUniprotIdError: "uniprotID is required",
  invalidUniprotIdError: "Invalid uniprotId",
  requiredPDBIdError: "proteinPDBID is required",
}


const ERROR_MESSAGES = {
  NOT_FOUND_ERROR: {
    name: 'NotFoundError',
    statusCode: httpStatus.NOT_FOUND,
    message: 'Resource not found',
  },
  
  UNAUTHORIZED_ERROR: {
    name: 'UnauthorizedError',
    statusCode: httpStatus.UNAUTHORIZED,
    message: 'Unauthorized access',
  },
};

// Example usage:
// throw new AppError(
//   ERROR_MESSAGES.NOT_FOUND_ERROR.name,
//   ERROR_MESSAGES.NOT_FOUND_ERROR.statusCode,
//   ERROR_MESSAGES.NOT_FOUND_ERROR.message
// );