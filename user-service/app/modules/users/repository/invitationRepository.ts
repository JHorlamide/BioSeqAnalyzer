import { PrismaClient } from "@prisma/client";
import { BaseInvitation, UpdateInvitation } from "../types/types";

class invitationRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async createInvitation(invitationData: BaseInvitation) {
    return await this.prisma.invitation.create({ data: invitationData });
  }

  public async updateInvitation(invitationId: string, updateFields: UpdateInvitation) {
    return await this.prisma.invitation.update({
      where: { id: invitationId },
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
