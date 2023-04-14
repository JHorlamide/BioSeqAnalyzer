import { Request, Response } from "express";
import asyncHandler from "../../../common/asyncHandler";

class ProjectController {
  public createProject = asyncHandler(async (req: Request, res: Response) => {
    
  })
}

export default new ProjectController();
