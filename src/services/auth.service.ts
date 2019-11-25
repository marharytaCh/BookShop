import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/services';
import { UserModel } from 'src/models';
import { environment } from 'src/environment';
import jwt = require('jsonwebtoken');
import { Hash } from 'src/common';
import { LoginUserModel } from 'src/models/login.model';
import { UserPayloadModel } from 'src/models/user/user-payload.model';

const env = environment();

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) private readonly usersService: UserService,
    @Inject(forwardRef(() => Hash)) private readonly passwordHelper: Hash,
    ) {}

  public async validateUser(username: string, password: string): Promise<UserModel> {
    const user = await this.usersService.findByUsername(username);
    const passwordHash: boolean = await this.passwordHelper.comparePassword(password, user.passwordHash);

    if (!passwordHash ) {
      return null;
    }

    if (passwordHash) {
      const userModel: UserModel = {};
      userModel.id = user.id;
      userModel.firstName = user.firstName;
      userModel.lastName = user.lastName;
      return userModel;
    }

    return null;
  }

  public getToken(loginModel: LoginUserModel): string {
    const accessToken: string = jwt.sign(loginModel, env.tokenSecret, { expiresIn: env.tokenLife});

    return accessToken;
  }

  public  getRefresh(payload: UserModel): string {
    const user: UserModel = {
      // role: payload.userRole,
      id: payload.id,
      username: payload.username,
    };
    const refreshToken: string = jwt.sign(user, env.tokenSecret, { expiresIn: env.tokenExpireIn});

    return refreshToken;
  }

}
