import { Request, Response, NextFunction } from "express";
import fs from "fs";
import requestBodyValidator from "../../../common/middleware/requestValidation";
import { createProjectSchema, paginationParams, projectUploadSchema } from "../validation/projectSchema";
import responseHandler from "../../../common/responseHandler";
import projectService from "../services/projectService";
import { upload } from "../../../config/multerConfig";
import { ERR_MSG } from "../types/constants";

class ProjectMiddleware {
  public validateRequestBodyField = requestBodyValidator(createProjectSchema);

  public validateUploadReq = (req: Request, res: Response, next: NextFunction) => {
    // Multer Upload validation
    upload(req, res, async (err) => {
      if (err) {
        return responseHandler.badRequest(err.message, res);
      }

      const { error } = projectUploadSchema.validate({ file: req.file });
      if (error) {
        // Remove the uploaded file if it doesn't match the schema
        if (req.file && req.file.path) {
          fs.unlinkSync(req.file.path);
        }

        return responseHandler.badRequest(error.details[0].message, res);
      }

      this.validateUploadedCSV(req, res, next);
    });
  }

  public validateUniProtIdParam(req: Request, res: Response, next: NextFunction) {
    const { uniprotId } = req.params;

    if (!uniprotId) {
      return responseHandler.badRequest("Invalid uniprotId", res);
    }

    next();
  }

  public validatePaginationParams(req: Request, res: Response, next: NextFunction) {
    const { page, limit, search } = req.query;

    const { error } = paginationParams.validate({ page, limit, search });
    if (error) {
      return responseHandler.badRequest(error.details[0].message, res);
    }

    next();
  }

  public async validateProjectExist(req: Request, res: Response, next: NextFunction) {
    const { projectId } = req.params;

    try {
      const project = await projectService.getProjectById(projectId);
      if (!project) {
        return responseHandler.badRequest(ERR_MSG.PROJECT_NOT_FOUND, res);
      }

      next();
    } catch (error: any) {
      return responseHandler.badRequest(error.message, res);
    }
  }

  public async validateProjectBelongsToUser(req: Request, res: Response, next: NextFunction) {
    const { userId } = res.locals.jwt;

    try {
      const project = await projectService.getProjectByUserId(userId);

      if (!project) {
        return responseHandler.forbiddenResponse("Not authorized", res);
      }

      next();
    } catch (error: any) {
      return responseHandler.serverError(error.message, res);
    }
  }

  private async validateUploadedCSV(req: Request, res: Response, next: NextFunction) {
    const file = req.file;

    if (!file) {
      return responseHandler.badRequest(ERR_MSG.NO_FILE_VALIDATION, res);
    }

    try {
      // Read and parse the CSV file
      const csvData = await projectService.parseCSVFile(file.buffer);

      // Validate the CSV structure
      if (!projectService.validateCSVStructure(csvData)) {
        return responseHandler.badRequest(ERR_MSG.INVALID_CSV_STRUCTURE, res);
      }

      next();
    } catch (error: any) {
      return responseHandler.serverError(`${ERR_MSG.FILE_VALIDATION_ERROR}: ${error.message}`, res);
    }
  }
}

export default new ProjectMiddleware();


