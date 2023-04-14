import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z.string().min(10, { message: "Full name is required" }),
  email: z.string().min(10, { message: "Email is required" }),
  password: z.string().min(5, { message: "Password is required" }),
});

export type RegisterFormData = z.infer<typeof registrationSchema>;

export interface IBaseResponse {
  status: string;
  message: string;
}

export interface IUser extends RegisterFormData { }

export interface IRegisterResponse extends IBaseResponse {
  data: null;
}