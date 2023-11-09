/* Libraries */
import argon2 from "argon2";
import { Request, Response } from "express";

/* Application Modules */
import asyncHandler from "../../../common/middleware/asyncHandler";
import responseHandler from "../../../common/responseHandler";
import userService from "../services/userService";
import { RES_MSG } from "../types/constants";

class UserController {
  public createUser = asyncHandler(async (req: Request, res: Response) => {
    const { password } = req.body;
    const passwordHash = await argon2.hash(password);
    const user = await userService.createUser({ ...req.body, password: passwordHash });
    responseHandler.successfullyCreated(RES_MSG.USER_CREATE, user, res);
  });

  public inviteUserToProject = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = res.locals.jwt;
    await userService.sendInvitation({ ...req.body, userId, });
    responseHandler.successResponse(RES_MSG.INVITE_SEND, {}, res);
  });

  public acceptProjectInvitation = asyncHandler(async (req: Request, res: Response) => {
    const userId = await userService.acceptProjectInvitation(req.body);
    responseHandler.successResponse(RES_MSG.USER_CREATE, { userId }, res);
  })
}

export default new UserController();
