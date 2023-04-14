import { Request, Response, NextFunction } from "express";
import requestBodyValidator from "../../../common/requestValidation";
import { createProjectSchema } from "../validation/projectSchema";

class ProjectMiddleware {
  public validateRequestBodyField = requestBodyValidator(createProjectSchema);
}

export default new ProjectMiddleware();
