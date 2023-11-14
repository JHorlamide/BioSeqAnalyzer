/* Core */
import crypto from "crypto";

/* Library */
import argon2 from "argon2";
import { InvitationStatus, Role } from "@prisma/client";

/* Application Modules */
import userRepository from "../repository/userRepository";
import mailService from "../mail-service/mailService";
import invitationRepository from "../repository/invitationRepository";
import config from "../../../config/appConfig";
import { ERR_MSG } from "../types/constants";
import { logger } from "../../../config/logger";
import { ClientError, NotFoundError, ServerError } from "../../../common/exceptions/ApiError";
import { AcceptInvitation, IUser, InvitationLink, SendProjectInvitation, UpdateInvitation } from "../types/types";

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

  public async deleteUser(userId: string) {
    try {
      await userRepository.deleteUser(userId);
    } catch (error: any) {
      throw new ServerError("Server error. Please try again later");
    }
  }

  public async sendInvitation(reqBodyField: SendProjectInvitation) {
    const { userId, projectId, userEmail, projectName } = reqBodyField;

    try {
      const user = await userRepository.getUserById(userId);

      if (!user) {
        throw new ClientError(ERR_MSG.USER_NOT_FOUND);
      }

      const { invitationToken } = await this.createInvitation(userEmail, projectId);

      const invitationLink = await this.getInvitationLink({
        userEmail,
        invitationToken,
        projectId
      });

      await mailService.sendInvitationEmail({
        template: "invitationEmail",
        projectName,
        senderName: user.fullName,
        receiverMail: userEmail,
        receiverName: userEmail,
        link: invitationLink
      });
    } catch (error: any) {
      logger.error(error.message);
      throw new ServerError(error.message);
    }
  }

  public async acceptProjectInvitation(reqBodyField: AcceptInvitation) {
    const { userEmail, invitationToken, fullName, password } = reqBodyField;

    try {
      const invitation = await this.getValidatedInvitation(String(invitationToken), userEmail);
      const passwordHash = await argon2.hash(password);
      const user = await userRepository.getUserByEmail(userEmail);

      if (user) {
        await this.updateInvitation(invitation.id, {
          status: InvitationStatus.ACCEPTED,
          invitationTokenExpiration: BigInt(0),
          invitationToken: null
        });

        await invitationRepository.createProjectsInvitedTo(
          user.id,
          invitation.projectId
        );

        return user.id;
      }

      const newUser = await this.createUser({
        fullName,
        email: userEmail,
        role: Role.MEMBER,
        password: passwordHash
      });

      if (newUser.userId) {
        await this.updateInvitation(invitation.id, {
          status: InvitationStatus.ACCEPTED,
          invitationTokenExpiration: BigInt(0),
          invitationToken: null
        });

        await invitationRepository.createProjectsInvitedTo(
          newUser.userId,
          invitation.projectId
        );

        return newUser.userId;
      }
    } catch (error: any) {
      logger.error(error.message);
      throw new ServerError(`Server error: ${error.message}`);
    }
  }

  private async getInvitationLink(params: InvitationLink) {
    const { userEmail, invitationToken, projectId } = params;
    const invitedUser = await userRepository.getUserByEmail(userEmail);
    const baseLink = invitedUser ? `${config.allowedOrigin.baseUrl}/auth/login` : `${config.allowedOrigin.baseUrl}/auth/register`;
    return `${baseLink}?invitation_token=${invitationToken}&user_email=${userEmail}&project_id=${projectId}`;
  }

  private async createInvitation(userEmail: string, projectId: string) {
    const invitationToken = crypto.randomBytes(16).toString("hex");
    const invitationExpiration = Date.now() + 24 * 3600000;

    try {
      return await invitationRepository.createInvitation({
        userEmail,
        projectId,
        invitationToken,
        invitationTokenExpiration: BigInt(invitationExpiration)
      });
    } catch (error: any) {
      logger.error(error.message);
      throw new ServerError(error.message);
    }
  }

  private async getValidatedInvitation(invitationToken: string, userEmail: string) {
    try {
      const invitation = await invitationRepository.getInvitationByToken(invitationToken);

      if (!invitation) {
        throw new ClientError(ERR_MSG.INVALID_INVITATION);
      }

      if (userEmail !== invitation.userEmail) {
        throw new ClientError(ERR_MSG.WRONG_USER_INVITATION);
      }

      return invitation;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  private async updateInvitation(invitationId: string, updateFields: UpdateInvitation) {
    await invitationRepository.updateInvitation(invitationId, updateFields);
  }
}

export default new UserService();
