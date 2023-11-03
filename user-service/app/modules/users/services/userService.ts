/* Application Modules */
import userRepository from "../repository/userRepository";
import { ERR_MSG } from "../types/constants";
import { IUser, SendProjectInvitation } from "../types/types";
import { ClientError, NotFoundError, ServerError } from "../../../common/exceptions/ApiError";
import mailService from "../mail-service/mailService";

class UserService {
  public async createUser(userBodyField: IUser) {
    try {
      const user = await userRepository.createUser(userBodyField);
      return { userId: user.id };
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  public async getUserByEmail(email: string) {
    try {
      const user = await userRepository.getUserByEmail(email);

      if (!user) {
        throw new NotFoundError(ERR_MSG.USER_NOT_FOUND);
      }

      return user;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  public async getUserById(userId: string) {
    try {
      const user = await userRepository.getUserById(userId);

      if (!user) {
        throw new ClientError(ERR_MSG.USER_NOT_FOUND);
      }

      return user;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  public async sendProjectInvitation(reqBodyField: SendProjectInvitation) {
    const { userId, projectId, projectName, fullName, role, password, email } = reqBodyField;

    try {
      const user = await userRepository.getUserById(userId);

      if (user) {
        const newUser = await this.createUser({ fullName, role, password, email });

        if (!newUser.userId) {
          throw new NotFoundError(ERR_MSG.USER_NOT_FOUND);
        }

        const invitationRes = mailService.sendEmail({
          senderName: String(user.fullName),
          projectName,
          receiverMail: email,
          receiverName: fullName,
          link: `mailto:olamidejubril68@gmail.com -> ${projectId}`
        });

        return invitationRes;
      }
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
}

export default new UserService();
