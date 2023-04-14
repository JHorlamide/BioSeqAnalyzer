import { Request, Response, NextFunction } from "express";

type controllerFun = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const asyncHandler = (controllerFun: controllerFun) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controllerFun(req, res, next);
    } catch (error: any) {
      return next(error);
    }
  }
}

export default asyncHandler;