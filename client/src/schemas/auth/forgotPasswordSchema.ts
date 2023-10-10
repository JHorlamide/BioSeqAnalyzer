import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().min(10, { message: "Email is required" }),
});

export type ForgotPassFormData = z.infer<typeof forgotPasswordSchema>