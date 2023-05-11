import { Request, Response, NextFunction } from "express";

type RequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const asyncHandler = (requestHandler: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await requestHandler(req, res, next);
    } catch (error: any) {
      return next(error);
    }
  }
}

export default asyncHandler;