import { Request, Response, NextFunction } from "express";
import cache from "memory-cache";
import requestBodyValidator from "../../../common/requestValidation";
import { createProjectSchema, paginationParams } from "../validation/projectSchema";
import responseHandler from "../../../common/responseHandler";
import projectService from "../services/projectService";

class ProjectMiddleware {
  public validateRequestBodyField = requestBodyValidator(createProjectSchema);

  public validateReqParam(req: Request, res: Response, next: NextFunction) {
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

    next();
  }

  /**
  * A middleware for caching responses.
  * @param duration The duration in seconds to cache the response.
  */
  public cacheMiddleware = (duration: number) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const key = `__protProject__ ${req.originalUrl || req.url}`;
      const cachedBody = cache.get(key);

      if (cachedBody) {
        const parsedBody = JSON.parse(cachedBody);
        return responseHandler.successResponse("Cached Response", parsedBody, res);
      }

      res.send = (body: any) => {
        // Cache the response body.
        cache.put(key, JSON.stringify(body), duration * 1000);

        // Send the response using the `successResponse` method of the `ResponseHandler`.
        return responseHandler.successResponse("New request cached", body, res);
      }

      next();
    }
  }
}

export default new ProjectMiddleware();
