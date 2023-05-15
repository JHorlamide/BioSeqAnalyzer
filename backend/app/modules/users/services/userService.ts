import userRepository from "../repository/userRepository";
import { ERR_MSG } from "../types/constants";
import { IUser } from "../types/types";
import { ClientError } from "../../../common/exceptions/clientError";

class UserService {
  public async createUser(userBodyField: IUser) {
    // Ensure that the necessary data is provided to create a user
    if (Object.keys(userBodyField).length === 0) {
      throw new ClientError(ERR_MSG.INVALID_USER_DATA)
    }

    try {
      const user = await userRepository.registerUser(userBodyField);
      return user.id;
    } catch (error: any) {
      throw new ClientError(error.message);
    }
  }

  public async getUserByEmail(email: string) {
    if (!email) {
      throw new ClientError(ERR_MSG.EMAIL_IS_REQUIRED);
    }

    try {
      const user = await userRepository.getUserByEmail(email);

      if (!user) {
        throw new ClientError(ERR_MSG.USER_NOT_FOUND);
      }

      return user;
    } catch (error: any) {
      throw new ClientError(error.message);
    }
  }
}

export default new UserService();
