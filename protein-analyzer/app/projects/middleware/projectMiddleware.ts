/* Core */
import fs from "fs";

/* Libraries */
import { Request, Response, NextFunction } from "express";

/* Application Modules */
import s3Service from "../fileService/fileService";
import projectService from "../services/projectService";
import responseHandler from "../../common/responseHandler";
import requestBodyValidator from "../../common/middleware/requestValidationMiddleware";
import { ERR_MSG } from "../types/constants";
import { multerUpload } from "../../common/middleware/multerMiddleware";
import { createProjectSchema, paginationSchema, projectUploadSchema } from "../validation/projectSchema";

class ProjectMiddleware {
  public validateRequestBodyField = requestBodyValidator(createProjectSchema);

  public validateUploadReq = (req: Request, res: Response, next: NextFunction) => {
    multerUpload(req, res, async (err) => {
      if (err) {
        return responseHandler.badRequest(err.message, res);
      }

      const { error } = projectUploadSchema.validate({ file: req.file });

      if (error) {
        // Remove the uploaded file if it doesn't match the schema
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }

        return responseHandler.badRequest(error.details[0].message, res);
      }

      this.validateUploadedCSV(req, res, next);
    });
  }

  public validatePaginationParams(req: Request, res: Response, next: NextFunction) {
    const { page, limit, search } = req.query;

    const { error } = paginationSchema.validate({ page, limit, search });
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
      return responseHandler.badRequest(error.message, res, 404);
    }
  }

  public async validateProjectBelongsToUser(req: any, res: Response, next: NextFunction) {
    const decodedUser = JSON.parse(req.headers["x-decoded-user"]);
    const { userId } = decodedUser;

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
      const csvData = await s3Service.parseCSVFile(file.buffer);

      // Validate the CSV structure
      if (!s3Service.validateCSVStructure(csvData)) {
        return responseHandler.badRequest(ERR_MSG.INVALID_CSV_STRUCTURE, res);
      }

      next();
    } catch (error: any) {
      return responseHandler.serverError(`${ERR_MSG.FILE_VALIDATION_ERROR}: ${error.message}`, res);
    }
  }
}

export default new ProjectMiddleware();


