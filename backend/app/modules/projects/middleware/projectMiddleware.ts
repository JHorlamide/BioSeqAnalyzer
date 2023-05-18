import { Request, Response, NextFunction } from "express";
import requestBodyValidator from "../../../common/middleware/requestValidation";
import { createProjectSchema, paginationParams, projectUploadSchema } from "../validation/projectSchema";
import responseHandler from "../../../common/responseHandler";
import projectService from "../services/projectService";

class ProjectMiddleware {
  public validateRequestBodyField = requestBodyValidator(createProjectSchema);

  public validateUploadParam = requestBodyValidator(projectUploadSchema);

  public validateUniProtIdParam(req: Request, res: Response, next: NextFunction) {
    const { uniprotId } = req.params;

    if (!uniprotId) {
      return responseHandler.failureResponse("Invalid uniprotId", res);
    }

    next();
  }

  public validatePaginationParams(req: Request, res: Response, next: NextFunction) {
    const { page, limit, search } = req.query;

    const { error } = paginationParams.validate({ page, limit, search });
    if (error) {
      return responseHandler.failureResponse(error.details[0].message, res);
    }

    next();
  }

  public async validateProjectBelongsToUser(req: Request, res: Response, next: NextFunction) {
    const { userId } = res.locals.jwt;

    const project = await projectService.getProjectByUserId(userId);

    if (!project) {
      return responseHandler.forbiddenResponse("Not authorized", res);
    }
    
    console.log("I was called: ProjectMiddleware");

    next();
  }
}

export default new ProjectMiddleware();
