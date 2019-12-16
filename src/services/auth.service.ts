import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UserService } from 'src/services';
import { ValidateUserModel, Token } from 'src/models';
import { environment } from 'src/environment';
import jwt = require('jsonwebtoken');
import { Hash } from 'src/common';
import { UserInRoleModel } from 'src/models/user/user-role.model';
import { AccessTokenModel } from 'src/models/access.model';

const env = environment();

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) private readonly usersService: UserService,
    @Inject(forwardRef(() => Hash)) private readonly passwordHelper: Hash,
    ) {}

  public async validateUser(username: string, password: string): Promise<ValidateUserModel> {
    let query = 'SELECT users.id, users.firstName, users.passwordHash, users.email, users.emailConfirmed, roles.name FROM userinroles INNER JOIN roles ON userinroles.roleId = roles.id INNER JOIN users ON userinroles.userId = users.id WHERE users.email = \'';
    query += username + '\'';
    const user: UserInRoleModel[] = await this.usersService.getUserInRoleByEmail(query);

    if (!user || !user[0].emailConfirmed ) {
      return null;
    }

    const validPassword: boolean = await this.passwordHelper.comparePassword(password, user[0].passwordHash);

    if (validPassword) {
      const authUser: ValidateUserModel = {};
      authUser.userId = user[0].id;
      authUser.firstName = user[0].firstName;
      authUser.role = user[0].name;

      return authUser;
    }

    return null;
  }

  public getAccess(user: ValidateUserModel): string {
    const accessToken: string = jwt.sign(user, env.tokenSecret, { expiresIn: env.tokenLife});

    return accessToken;
  }

  public  getTokens(user: ValidateUserModel): Token {
    const accessToken = this.getAccess(user);
    const access: AccessTokenModel = {
      accessToken,
    };
    const refresh: string = jwt.sign(access, env.tokenSecret, { expiresIn: env.tokenExpireIn });
    const tokens: Token = {
      accessToken,
      refreshToken: refresh,
    };

    return tokens;
  }

}
