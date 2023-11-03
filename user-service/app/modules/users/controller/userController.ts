/* Libraries */
import argon2 from "argon2";
import { Request, Response } from "express";

/* Application Modules */
import asyncHandler from "../../../common/middleware/asyncHandler";
import responseHandler from "../../../common/responseHandler";
import userService from "../services/userService";
import { RES_MSG } from "../types/constants";
import { Utils } from "../../../utils";

class UserController {
  public createUser = asyncHandler(async (req: Request, res: Response) => {
    const { password } = req.body;
    const passwordHash = await argon2.hash(password);
    const user = await userService.createUser({ ...req.body, password: passwordHash });
    responseHandler.successfullyCreated(RES_MSG.USER_CREATE, user, res);
  });

  public inviteUserToProject = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { loginPassword, temporaryPassword } = await Utils.generateTempPassword();
    await userService.sendProjectInvitation({
      ...req.body,
      userId,
      loginPassword,
      password: temporaryPassword
    });

    responseHandler.successResponse(RES_MSG.INVITE_SEND, {}, res);
  });
}

export default new UserController();
