
import { PrismaClient, User } from "@prisma/client"
import { IUser } from '../types/types';

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
}

export default new UserRepository();
