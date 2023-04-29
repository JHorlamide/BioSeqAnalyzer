import httpStatus from "http-status";

export const RES_MSG = {
  projectCreated: "Project created successfully",
  projectsFetched: "Projects fetched successfully",
  projectFetched: "Project fetched successfully",
  proteinSequenceFetched: "Protein sequence fetched successfully",
  projectNotFound: "Project not found"
}

export const ERR_MSG = {
  requiredUniprotIdError: "uniprotId is required",
  invalidUniprotIdError: "Invalid uniprotId",
  requiredPDBIdError: "proteinPDBID is required",
}

export const ERROR_MESSAGES = {
  REQUIRED_USER_ID: {
    name: "InvalidUserId",
    statusCode: httpStatus.BAD_REQUEST,
    message: "userId is required"
  },

  REQUIRED_PROJECT_DATA: {
    name: "InvalidInputError",
    statusCode: httpStatus.BAD_REQUEST,
    message: "projectTitle, projectGoal, and, measuredProperty are required fields"
  },

  REQUIRED_PROJECT_ID: {
    name: "InvalidProjectId",
    statusCode: httpStatus.BAD_REQUEST,
    message: "projectId is a required fields"
  },

  PROJECT_NOT_FOUND: {
    name: 'ProjectNotFoundError',
    statusCode: httpStatus.NOT_FOUND,
    message: 'Project not found',
  },
};

// Example usage:
// throw new AppError(
//   ERROR_MESSAGES.NOT_FOUND_ERROR.name,
//   ERROR_MESSAGES.NOT_FOUND_ERROR.statusCode,
//   ERROR_MESSAGES.NOT_FOUND_ERROR.message
// );