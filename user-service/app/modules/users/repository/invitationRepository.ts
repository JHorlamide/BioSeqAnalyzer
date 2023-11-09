import { PrismaClient } from "@prisma/client";
import { Invitation, UpdateInvitation } from "../types/types";

class invitationRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async createInvitation(invitationData: Invitation) {
    return await this.prisma.invitation.create({ data: invitationData });
  }

  public async updateInvitation(invitationToken: string, updateFields: UpdateInvitation) {
    return await this.prisma.invitation.update({
      where: { invitationToken: invitationToken },
      data: updateFields
    })
  }

  public async getInvitationByToken(invitationToken: string) {
    return await this.prisma.invitation.findFirst({ where: { invitationToken } });
  }

  /* This will be refactored later */
  public async createProjectsInvitedTo(userId: string, projectId: string) {
    return await this.prisma.projectsInvitedTo.create({
      data: { userId, projectId }
    })
  }
}

export default new invitationRepository();
