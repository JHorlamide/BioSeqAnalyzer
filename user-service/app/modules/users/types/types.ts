import { User, Role, Invitation } from "@prisma/client"

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  role: Role;
}

export type SendProjectInvitation = Pick<Invitation, "userEmail" | "projectId"> & {
  userId: string;
  projectName: string;
}

export type BaseInvitation = Pick<Invitation,
  "userEmail" |
  "projectId" |
  "invitationToken" |
  "invitationTokenExpiration"
>

export type AcceptInvitation = Pick<Invitation, "userEmail" | "invitationToken"> & {
  fullName: string;
  password: string;
}

export interface ProjectInvitedTo {
  user: any
  userId: string;
  projectId: string;
}

export type InvitationLink = Pick<Invitation, "projectId" | "userEmail" | "invitationToken">;

export type UpdateUser = Partial<User>;

export type UpdateInvitation = Partial<Invitation>;
