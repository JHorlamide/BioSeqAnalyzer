/* Libraries */
import { NextFunction, Request, Response } from "express";

/* Application Modules */
import responseHandler from "../../../common/responseHandler";
import requestBodyValidator from "../../../common/middleware/requestValidation";
import userRepository from "../repository/userRepository";
import { ERR_MSG } from "../types/constants";
import { registerUser, invitation, acceptInvitation } from "../validation/userSchema";

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
}

export default new UserMiddleware();
