
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

export interface SendProjectInvitation extends IUser{
  userId: string;
  projectId: string;
  projectName: string;
}
