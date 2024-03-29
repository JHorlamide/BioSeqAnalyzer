/* Libraries */
import { Request, Response } from "express";
import argon2 from "argon2";

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
    responseHandler.successResponse(RES_MSG.INVITATION_ACCEPTED, { userId }, res);
  });

  public deleteUserAccount = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = res.locals.jwt;
    await userService.deleteUser(userId);
    responseHandler.noContentRes(res);
  })
}

export default new UserController();
