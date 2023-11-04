import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().min(10, { message: "Email is required" }),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(5, { message: "New password is required" }),
  confirmPassword: z.string().min(5, { message: "New password is required" }),
});

export type ResetPassFormData = z.infer<typeof resetPasswordSchema>

export type ForgotPassFormData = z.infer<typeof forgotPasswordSchema>