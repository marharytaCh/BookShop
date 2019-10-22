import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService, User } from 'src/services/index';
import { environment } from 'src/environment';

// tslint:disable-next-line: no-var-requires
const jwt = require ('jsonwebtoken');
const env = environment();

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  public getToken(user: User) {
    const accessToken: string = jwt.sign(user, env.tokenSecret, { expiresIn: env.tokenLife});
    return accessToken;
  }

  public  getRefresh(payload: User) {
    const user = {
      role: payload.role,
      userId: payload.userId,
      username: payload.username,
    };
    const refreshToken: string = jwt.sign(user, env.tokenSecret, { expiresIn: env.refreshTokenLife});

    return refreshToken;
  }
  // async login(user: any) {
  //   const payload = { username: user.username, sub: user.userId};
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
}
