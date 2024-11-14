//auth.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.entity';
import { AccessToken } from './types/AccessToken';
import { UserService } from 'src/users/users.service';
import { RegisterRequestDto } from './dtos/register-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  /*
  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(username);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }
*/

  async login(user: User): Promise<AccessToken> {
    const payload = { username: user.username, id: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

}