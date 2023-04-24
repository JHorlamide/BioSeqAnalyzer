import userRepository from "../repository/userRepository";
import { ERROR_MESSAGES } from "../types/constants";
import { IUser } from "../types/types";
import { AppError } from "../../../common/middleware/appError";
import { GENERAL_ERROR } from "../../../config/appConstants";

const { name, statusCode } = GENERAL_ERROR.ERROR_MSG;

class UserService {
  public async createUser(userBodyField: IUser) {
    // Ensure that the necessary data is provided to create a user
    if (Object.keys(userBodyField).length === 0) {
      const { REQUIRED_USER_FIELDS } = ERROR_MESSAGES;

      throw new AppError(
        REQUIRED_USER_FIELDS.name,
        REQUIRED_USER_FIELDS.statusCode,
        REQUIRED_USER_FIELDS.message, true);
    }

    try {
      const user = await userRepository.registerUser(userBodyField);
      return user.id;
    } catch (error: any) {
      throw new AppError(name, statusCode, error.message, true);
    }
  }

  public async getUserByEmail(email: string) {
    if (!email) {
      const { INVALID_EMAIL_ERROR } = ERROR_MESSAGES;

      throw new AppError(
        INVALID_EMAIL_ERROR.name,
        INVALID_EMAIL_ERROR.statusCode,
        INVALID_EMAIL_ERROR.message, true);
    }

    try {
      const user = await userRepository.getUserByEmail(email);

      if (!user) {
        const { USER_FOUND_ERROR } = ERROR_MESSAGES;

        throw new AppError(
          USER_FOUND_ERROR.name,
          USER_FOUND_ERROR.statusCode,
          USER_FOUND_ERROR.message, true);
      }

      return user;
    } catch (error: any) {
      throw new AppError(name, statusCode, error.message, true);
    }
  }
}

export default new UserService();
