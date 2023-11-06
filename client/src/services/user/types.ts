import { IBaseResponse } from "../../schemas";

export interface SendEmailInviteReq {
  userEmail: string;
  projectType: string;
  projectName: string;
  projectId: string;
}

export interface SendEmailInvitationRes extends IBaseResponse {
  data: {}
}