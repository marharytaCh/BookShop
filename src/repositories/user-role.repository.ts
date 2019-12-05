import { Injectable } from '@nestjs/common';
import { UserInRole } from 'src/entity';

@Injectable()
export class UserRoleRepo {
  public async createUserInRole(userInRole: UserInRole) {
    const createdUserInRole: UserInRole = await userInRole.save();

    return createdUserInRole;
  }
}
