import { Request, Response, NextFunction } from "express";
import requestBodyValidator from "../../../common/requestValidation";
import { createProjectSchema } from "../validation/projectSchema";
import responseHandler from "../../../common/responseHandler";

class ProjectMiddleware {
  public validateRequestBodyField = requestBodyValidator(createProjectSchema);

  public validateReqParam(req: Request, res: Response, next: NextFunction) {
    const { uniprotId } = req.params;

    if (!uniprotId) {
      return responseHandler.failureResponse("Invalid uniprotId", res);
    }

    next();
  }
}

export default new ProjectMiddleware();
