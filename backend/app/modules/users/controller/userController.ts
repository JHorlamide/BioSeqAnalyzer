import { Request, Response } from "express";
import argon2 from "argon2";
import asyncHandler from "../../../common/asyncHandler";
import responseHandler from "../../../common/responseHandler";
import userService from "../services/userService";
import { RES_MSG } from "../types/constants";

class UserController {
  public createUser = async (req: Request, res: Response) => {
    try {
      const { password } = req.body;
      const passwordHash = await argon2.hash(password);
      const user = await userService.createUser({ ...req.body, password: passwordHash });
      responseHandler.successfullyCreated(RES_MSG.USER_CREATE, user, res);
    } catch (error: any) {
      return responseHandler.failureResponse(error.message, res);
    }
  }
  // public createUser = asyncHandler(async (req: Request, res: Response) => {
  //   const { password } = req.body;
  //   const passwordHash = await argon2.hash(password);
  //   const user = await userService.createUser({ ...req.body, password: passwordHash });
  //   responseHandler.successfullyCreated(RES_MSG.USER_CREATE, user, res);
  // })

  public getUserDetails = asyncHandler(async (req: Request, res: Response) => {

  })
}

export default new UserController();
