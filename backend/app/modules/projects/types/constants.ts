export const RES_MSG = {
  PROJECT_CREATED: "Project created successfully",
  PROJECTS_FETCHED: "Projects fetched successfully",
  PROJECT_FETCHED: "Project fetched successfully",
  PROJECT_UPDATED: "Project updated successfully",
  PROJECT_NOT_FOUND: "Project not found",
  PROJECT_DELETED: "Project deleted successfully",
  FILE_UPLOADED: "File uploaded and data saved successfully",
  SUMMARY_FETCHED: "Summary of main matrices fetched",
  TOP_PERFORMING_VARIANTS_FETCHED: "Top performing variants",
  HISTOGRAM_DATA: "Histogram data fetched",
}

export const ERR_MSG = {
  UNIPROT_ID_REQUIRED: "uniprotId is required",
  INVALID_UNIPROT_ID: "Invalid Uniprot id",
  USER_ID_REQUIRED: "userId is required",
  PROJECT_ID_REQUIRED: "projectId is a required fields",
  PROJECT_NOT_FOUND: "Project not found",
  INVALID_PROJECT_DATA: "projectTitle, projectGoal, and, measuredProperty are required fields",
  INVALID_CSV_STRUCTURE: "CSV file must contain columns: sequence, fitness, muts and must contain at least one row with muts = WT",
  ERR_PROCESSING_CSV: "Error processing CSV file",
  NO_FILE_UPLOAD: "No file uploaded",
  NO_FILE_VALIDATION: "No file was uploaded for validation",
  FILE_VALIDATION_ERROR: "An error occurred during CSV validation",
  PARSE_CSV_FAILED: "Failed to parse CSV file",
  FILE_UPLOAD_ERROR: "Could not upload file. Please try again later",
  INVALID_UNIPROT: "Invalid UniProt ID. Please check your input.",
  UNIPROT_NOT_FOUND: "Not found. The requested resource was not found.",
  REQ_ERROR: "An error occurred. Please try again later."
}