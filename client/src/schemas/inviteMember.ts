import { z } from "zod";

export const inviteMemberSchema = z.object({
  name: z.string().min(5, { message: "Project name is required" }),
  email: z.string()
})

export type InviteMemberFormData = z.infer<typeof inviteMemberSchema>;