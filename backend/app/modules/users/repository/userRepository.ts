import { User } from "../model/User";
import { IUser } from '../types/types';


class UserRepository {
  public async getUserByEmail(email: string) {
    return await User.findOne({ email }).exec();
  }

  public async registerUser(user: IUser) {
    return await User.create({ ...user });
  }
}

export default new UserRepository();
