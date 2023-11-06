/* Core */
import crypto from "crypto";

/* Library */
import { InvitationStatus, Role } from "@prisma/client";

/* Application Modules */
import userRepository from "../repository/userRepository";
import mailService from "../mail-service/mailService";
import invitationRepository from "../repository/invitationRepository";
import config from "../../../config/appConfig";
import { ERR_MSG } from "../types/constants";
import { AcceptInvitation, IUser, Invitation, InvitationLink, SendProjectInvitation, UpdateInvitation } from "../types/types";
import { ClientError, NotFoundError, ServerError } from "../../../common/exceptions/ApiError";

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
    const { userId, projectId, userEmail, projectName, projectType } = reqBodyField;

    try {
      const user = await userRepository.getUserById(userId);

      if (!user) {
        throw new ClientError(ERR_MSG.USER_NOT_FOUND);
      }

      const { invitationToken } = await this.createInvitation(userEmail, projectId);

      const invitationLink = await this.invitationLink({
        userEmail,
        invitationToken,
        projectType
      });

      await mailService.sendInvitationEmail({
        senderName: user.fullName,
        projectName,
        template: "invitationEmail",
        receiverMail: userEmail,
        receiverName: userEmail,
        link: invitationLink
      });
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  public async acceptProjectInvitation(reqBodyField: AcceptInvitation) {
    const { userEmail, invitationToken, fullName, password } = reqBodyField;

    try {
      const invitation = await this.getInvitation(invitationToken, userEmail);

      const newUser = await this.createUser({
        email: userEmail,
        role: Role.MEMBER,
        fullName,
        password,
      });

      await this.updateInvitation(invitationToken);

      await invitationRepository.createProjectsInvitedTo(
        newUser.userId,
        invitation.projectId
      );

      return newUser;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  private async invitationLink({ userEmail, invitationToken, projectType }: InvitationLink) {
    const invitedUser = await userRepository.getUserByEmail(userEmail);
    const baseLink = invitedUser ? `${config.allowedOrigin}/auth/login` : `${config.allowedOrigin}/auth/register`;
    const invitationLink = `${baseLink}?invitation_token=${invitationToken}&user_email=${userEmail}&project_type=${projectType}`
    return invitationLink;
  }

  private async createInvitation(userEmail: string, projectId: string) {
    const invitationToken = crypto.randomBytes(16).toString("hex")
    const invitationExpiration = Date.now() + 24 * 3600000; // 24 hours

    return await invitationRepository.createInvitation({
      userEmail,
      invitationToken,
      projectId,
      invitationTokenExpiration: BigInt(invitationExpiration)
    })
  }

  private async getInvitation(invitationToken: string, userEmail: string) {
    const invitation = await invitationRepository.getInvitationByToken(invitationToken);

    if (!invitation) {
      throw new ClientError(ERR_MSG.INVALID_INVITATION);
    }

    if (userEmail !== invitation.userEmail) {
      throw new ClientError(ERR_MSG.WRONG_USER_INVITATION);
    }

    invitation.status = InvitationStatus.ACCEPTED;

    return invitation;
  }

  private async updateInvitation(invitationToken: string) {
    await invitationRepository.updateInvitation(invitationToken, {
      status: InvitationStatus.ACCEPTED,
      invitationTokenExpiration: undefined,
      invitationToken: undefined
    });
  }
}

export default new UserService();
