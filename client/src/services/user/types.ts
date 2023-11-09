import { IBaseResponse } from "../../schemas";

export interface SendEmailInviteReq {
  userEmail: string;
  projectType: string;
  projectName: string;
  projectId: string;
}

export interface AcceptInvitationReq {
  invitationToken: string;
  userEmail: string;
  fullName: string;
  password: string;
}

export interface SendEmailInvitationRes extends IBaseResponse {
  data: {}
}

export interface AcceptInvitationRes extends IBaseResponse {
  data: {
    userId: string;
  }
}