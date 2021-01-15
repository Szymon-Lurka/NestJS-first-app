import { Injectable } from '@nestjs/common';
import { RegisterUserResponse } from 'src/interface/user';
import { RegisterDto } from './dto/register.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  async register(newUser: RegisterDto): Promise<RegisterUserResponse> {
    const { email } = newUser;
    const isUser = await User.findOne({
      email,
    });
    if (isUser) {
      return {
        isSuccess: false,
        description: 'Istnieje już użytkownik o takim emailu!',
      };
    }
    const user = new User();
    user.email = newUser.email;
    await user.save();
    return user;
  }
  async checkUser(id:string): Promise<User> {
    return await User.findOne(id);
  }
}
