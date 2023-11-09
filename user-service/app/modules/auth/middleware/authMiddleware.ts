/* Libraries */
import { Request, Response, NextFunction } from "express";
import argon2 from "argon2";

/* Application Modules */
import requestBodyValidator from "../../../common/middleware/requestValidation";
import userService from "../../users/services/userService"
import responseHandler from "../../../common/responseHandler";
import { ERR_MSG } from "../../users/types/constants";
import { userLogin, forgotPassword, passwordReset } from "../validation/authSchema";

class AuthMiddleware {
  public validateReqAuthFields = requestBodyValidator(userLogin);

  public validateForgotPasswordField = requestBodyValidator(forgotPassword);
  
  public validatePasswordReset = requestBodyValidator(passwordReset);

  public async verifyPassword(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const user = await userService.getUserByEmail(email);

      if (!user) {
        return responseHandler.badRequest(ERR_MSG.USER_NOT_FOUND, res);
      }

      if (await argon2.verify(user.password, password)) {
        req.body = {
          userId: user.id,
          role: user.role,
          email: user.email,
          fullName: user.fullName,
        }

        return next();
      }

      return responseHandler.badRequest("Invalid email and/or password", res);
    } catch (error: any) {
      console.log({ error })
      return responseHandler.badRequest(error.message, res);
    }
  }
}

export default new AuthMiddleware();
