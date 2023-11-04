import { IBaseResponse } from "../../schemas";
import { User } from "../../schemas/auth/loginSchema";

export interface ILoginResponse extends IBaseResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    user: User
  }
}

export interface ForgotPasswordReq {
  email: string;
}

export interface ForgotPasswordRes extends IBaseResponse {
  data: {}
}

export interface ResetPasswordReq {
  password: string;
  confirmPassword: string;
  passwordToken: string;
}

export interface ResetPasswordRes extends IBaseResponse {
  data: {
    userId: string;
  }
}

export interface IRegisterResponse extends IBaseResponse {
  data: null;
}