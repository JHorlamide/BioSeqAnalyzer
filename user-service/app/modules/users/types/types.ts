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
  projectType: string;
}

export interface Invitation {
  userEmail: string;
  projectId: string;
  invitationToken: string;
  invitationTokenExpiration: BigInt;
}

export interface AcceptInvitation {
  userEmail: string;
  fullName: string;
  invitationToken: string;
  password: string;
}

export interface ProjectInvitedTo {
  user: any
  userId: string;
  projectId: string;
}

export interface InvitationLink {
  userEmail: string,
  invitationToken: string,
  projectType: string
}


export type UpdateUser = Partial<User>;

export type UpdateInvitation = Partial<Invitation> & {
  status: InvitationStatus
};
