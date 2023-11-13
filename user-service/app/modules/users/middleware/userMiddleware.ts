/* Libraries */
import { NextFunction, Request, Response } from "express";

/* Application Modules */
import responseHandler from "../../../common/responseHandler";
import requestBodyValidator from "../../../common/middleware/requestValidation";
import userRepository from "../repository/userRepository";
import { ERR_MSG } from "../types/constants";
import { registerUser, invitation, acceptInvitation } from "../validation/userSchema";
import userService from "../services/userService";

class UserMiddleware {
  public validateReqBodyField = requestBodyValidator(registerUser);

  public validateInvitationReqBody = requestBodyValidator(invitation);

  public validateAcceptBody = requestBodyValidator(acceptInvitation);

  public async validateUserAlreadyExit(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    const user = await userRepository.getUserByEmail(email);

    if (user) {
      return responseHandler.badRequest(ERR_MSG.USER_EXIT, res);
    }

    next();
  }

  // public async validateUserHasRequiredRole(req: Request, res: Response, next: NextFunction) {
  //   const { userId } = res.locals.jwt;

  //   try {
  //     const user = await userService.getUserById(userId);

  //     if (!user) {
  //       return responseHandler.badRequest(ERR_MSG.USER_NOT_FOUND, res);
  //     }

  //     if (user && user.role !== "AUTHOR") {
  //       return responseHandler.badRequest("You don't have the permission to invite other member", res);
  //     }

  //     return next();
  //   } catch (error: any) {
  //     return responseHandler.badRequest(error.message, res);
  //   }
  // }
}

export default new UserMiddleware();
