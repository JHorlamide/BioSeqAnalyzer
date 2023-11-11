import { User, Role, InvitationStatus } from "@prisma/client"

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  role: Role;
}

export interface SendProjectInvitation {
  userId: string;
  projectId: string;
  userEmail: string;
  projectName: string;
}

export type Invitation = Pick<SendProjectInvitation, "userEmail" | "projectId"> & {
  invitationToken: string;
  invitationTokenExpiration: bigint;
}

export type AcceptInvitation = Pick<Invitation, "userEmail" | "invitationToken"> & {
  fullName: string;
  password: string;
}

export interface ProjectInvitedTo {
  user: any
  userId: string;
  projectId: string;
}

export type InvitationLink = Pick<SendProjectInvitation, "projectId" | "userEmail"> & {
  invitationToken: string | null;
}

export type UpdateUser = Partial<User>;

export type UpdateInvitation = Partial<Invitation> & {
  status: InvitationStatus
};
