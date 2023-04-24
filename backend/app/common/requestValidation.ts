import { Request, Response, NextFunction } from "express";
import responseHandler from "./responseHandler";

const requestBodyValidator = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return responseHandler.failureResponse(error.details[0].message, res);
    }

    console.log("projectMiddleware called");
    next();
  }
}

export default requestBodyValidator