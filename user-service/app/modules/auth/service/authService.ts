import crypto from "crypto";

/* Libraries */
import argon2 from "argon2";

/* Application Modules */
import config from "../../../config/appConfig";
import userRepository from "../../users/repository/userRepository";
import mailService from "../../users/mail-service/mailService";
import { ERR_MSG } from "../types/constants";
import { ClientError, NotFoundError, ServerError } from "../../../common/exceptions/ApiError";
import { ResetPassword, ValidatePassword } from "../types/authTypes";
import { UpdateUser } from "../../users/types/types";

class AuthService {
  public async forgotPassword({ email }: { email: string }) {
    try {
      const user = await userRepository.getUserByEmail(email);

      if (!user) {
        throw new ClientError(ERR_MSG.USER_NOT_FOUND)
      }

      const resetToken = crypto.randomBytes(20).toString("hex");
      const resetExpiration = Date.now() + 3600000; // 1 hour

      const updateFields: UpdateUser = {
        email,
        id: user.id,
        resetToken: resetToken,
        resetTokenExpiration: BigInt(resetExpiration)
      }

      // Save the reset token and expiration date to the user's account
      const updatedUser = await userRepository.updateUserDetails(updateFields);
      const resetLink = `${config.allowedOrigin}/auth/reset-password/${resetToken}`;

      if (!updatedUser) {
        throw new NotFoundError(ERR_MSG.USER_NOT_FOUND);
      }

      await mailService.sendForgotPasswordMail({
        template: "forgotpassword",
        receiverMail: email,
        link: resetLink,
        receiverName: user.fullName
      });
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  public async resetPassword(resetPasswordField: ResetPassword) {
    const { password, confirmPassword, passwordToken } = resetPasswordField;

    if (!this.validatePasswordMatch({ password, confirmPassword })) {
      throw new ClientError("Passwords do not match.");
    }

    try {
      let user = await userRepository.getUserByResetToken(passwordToken);
      if (!user) {
        throw new ClientError("Invalid reset token. Please try again.");
      }

      const passwordExpiration = Number(user.resetTokenExpiration)! + 3600000; // 1 hour
      if (passwordExpiration < Date.now()) {
        throw new ClientError("Password reset link expired");
      }

      user = await userRepository.getUserById(user.id);
      if (!user) {
        throw new ClientError(ERR_MSG.USER_NOT_FOUND);
      }

      const updateUserDetails: UpdateUser = {
        email: user.email,
        resetToken: null,
        resetTokenExpiration: null,
        password: await argon2.hash(password),
      }

      const updatedUser = await userRepository.updateUserDetails(updateUserDetails);
      if (!updatedUser) {
        throw new ClientError("Could reset password. Please try again later");
      }

      return updatedUser.id;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  private validatePasswordMatch(passwordField: ValidatePassword) {
    const { password, confirmPassword } = passwordField;

    if (password !== confirmPassword) {
      return false;
    }

    return true;
  }
}

export default new AuthService();
