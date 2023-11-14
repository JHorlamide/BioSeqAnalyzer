
import { PrismaClient, User } from "@prisma/client"
import { IUser, UpdateUser } from "../types/types";

class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async createUser(userData: IUser): Promise<User> {
    return await this.prisma.user.create({ data: userData });
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  public async getUserById(userId: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id: userId } });
  }

  public async updateUserDetails(data: UpdateUser): Promise<User> {
    return await this.prisma.user.update({
      where: { email: data.email },
      data: { ...data }
    })
  }

  public async getUserByResetToken(resetToken: string) {
    return await this.prisma.user.findUnique({ where: { resetToken } });
  }

  public async deleteUser(userId: string) {
    return await this.prisma.user.delete({ where: { id: userId } });
  }
}

export default new UserRepository();
