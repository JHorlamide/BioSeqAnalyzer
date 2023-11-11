import { z } from "zod";

export const inviteMemberSchema = z.object({
  userEmail: z.string(),
})

export type InviteMemberFormData = z.infer<typeof inviteMemberSchema>;
