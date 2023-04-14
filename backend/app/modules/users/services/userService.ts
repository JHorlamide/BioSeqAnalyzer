import userRepository from "../repository/userRepository";
import { ERROR_MESSAGES } from "../types/constants";
import { IUser } from "../types/types";
import { AppError } from "../../../common/middleware/appError";

const { name, statusCode } = ERROR_MESSAGES.GENERAL_ERROR;

class UserService {
  public async createUser(userBodyField: IUser) {
    if (Object.keys(userBodyField).length === 0) {
      const { name, statusCode, message } = ERROR_MESSAGES.REQUIRED_CREATE_FIELD;
      throw new AppError(name, statusCode, message, true);
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
      const { name, statusCode, message } = ERROR_MESSAGES.INVALID_EMAIL_ERROR;
      throw new AppError(name, statusCode, message, true);
    }

    try {
      const user = await userRepository.getUserByEmail(email);
      if (!user) {
        const { name, statusCode, message } = ERROR_MESSAGES.USER_FOUND_ERROR;
        throw new AppError(name, statusCode, message, true);
      }

      return user;
    } catch (error: any) {
      throw new AppError(name, statusCode, error.message, true);
    }
  }


}

export default new UserService();
