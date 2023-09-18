import userRepository from "../repository/userRepository";
import { ERR_MSG } from "../types/constants";
import { IUser } from "../types/types";
import { ClientError } from "../../../common/exceptions/clientError";
import { NotFoundError } from "../../../common/exceptions/notFoundError";

class UserService {
  public async createUser(userBodyField: IUser) {
    try {
      const user = await userRepository.createUser(userBodyField);
      return { userId: user.id };
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
        throw new NotFoundError(ERR_MSG.USER_NOT_FOUND);
      }

      return user;
    } catch (error: any) {
      throw new ClientError(error.message);
    }
  }
}

export default new UserService();
