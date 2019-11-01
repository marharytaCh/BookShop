import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/services/index';
import { User } from 'src/models';
import { environment } from 'src/environment';
import jwt = require('jsonwebtoken');

const env = environment();

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly usersService: UserService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // const user = await this.usersService.findOne(username);
    // if (user && user.passwordHash === pass) {
    //   const { passwordHash, ...result } = user;
    //   return result;
    // }
    // return null;
  }
  public getToken(user: User) {
    const accessToken: string = jwt.sign(user, env.tokenSecret, { expiresIn: env.tokenLife});
    return accessToken;
  }

  public  getRefresh(payload: User) {
    const user = {
      role: payload.userRole,
      userId: payload.id,
      username: payload.username,
    };
    const refreshToken: string = jwt.sign(user, env.tokenSecret, { expiresIn: env.refreshTokenLife});

    return refreshToken;
  }

}
