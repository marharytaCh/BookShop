import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/services';
import { UserModel } from 'src/models';
import { environment } from 'src/environment';
import jwt = require('jsonwebtoken');
import { Hash } from 'src/common';
import { LoginUserModel } from 'src/models/login.model';

const env = environment();

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly usersService: UserService,
    @Inject(forwardRef(() => Hash))
    private readonly passwordHelper: Hash) {}

    public async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    const passwordHash: string = await this.passwordHelper.getHashing(password, user.passwordSalt);

    return user.passwordHash === passwordHash;
  }

  public getToken(loginModel: LoginUserModel) {
    const accessToken: string = jwt.sign(loginModel, env.tokenSecret, { expiresIn: env.tokenLife});

    return accessToken;
  }

  public  getRefresh(payload: UserModel) {
    const user = {
      role: payload.userRole,
      userId: payload.id,
      username: payload.username,
    };
    const refreshToken: string = jwt.sign(user, env.tokenSecret, { expiresIn: env.refreshTokenLife});

    return refreshToken;
  }


}
