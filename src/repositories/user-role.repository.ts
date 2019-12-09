import { Injectable } from '@nestjs/common';
import { UserInRole } from 'src/entity';
import database = require('src/entity');

@Injectable()
export class UserRoleRepo {

  public async getAll(): Promise<UserInRole[]> {
    const usersInRole: UserInRole[] = await database.UserInRole.findAll();

    return usersInRole;
  }

  public async getById(id: string) {
    const userInRole = await database.UserInRole.findOne({
      where: {id},
    });

    return userInRole;
  }
  public async addUserInRole(userInRole: UserInRole) {
    const createdUserInRole: UserInRole = await userInRole.save();

    return createdUserInRole;
  }
}
