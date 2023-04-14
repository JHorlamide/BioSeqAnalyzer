import { NextFunction, Request, Response } from "express";
import responseHandler from "../../../common/responseHandler";
import requestBodyValidator from "../../../common/requestValidation";
import { registerUser } from "../validation/userSchema";
import userService from "../services/userService";
import userRepository from "../repository/userRepository";
import { ERR_MSG } from "../types/constants";

class UserMiddleware {
  public validateReqBodyField = requestBodyValidator(registerUser);

  public async validateUserAlreadyExit(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const user = await userRepository.getUserByEmail(email);

    if (user) {
      return responseHandler.failureResponse(ERR_MSG.USER_EXIT, res);
    }

    next();
  }
}

export default new UserMiddleware();
