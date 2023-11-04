import { User } from "@prisma/client"

enum Role {
  AUTHOR = "AUTHOR",
  MEMBER = "MEMBER"
}
export interface IUser {
  fullName: string;
  email: string;
  password: string;
  role: Role;
}

export interface SendProjectInvitation extends IUser {
  userId: string;
  projectId: string;
  projectName: string;
  loginPassword: string;
}

export type UpdateUser = Partial<User>;

// export interface UpdateUser {
//   email: string;
//   id: string;
//   resetToken: string;
//   resetTokenExpiration: number;
// } 
