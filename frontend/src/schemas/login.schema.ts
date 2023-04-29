import { z } from "zod";
import { IBaseResponse } from ".";

export const loginSchema = z.object({
  email: z.string().min(10, { message: "Email is required" }),
  password: z.string().min(5, { message: "Password is required" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export type IUserLogin = LoginFormData;

export type IForgotPassword = Pick<LoginFormData, "email">;

export interface User {
  userId: string;
  fullName: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
}

export interface ILoginResponse extends IBaseResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    user: User
  }
}

// export type IUserLogin = Pick<IUser, "email" | "password">;