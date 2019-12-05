import { Injectable } from '@nestjs/common';
import database = require('src/entity');

@Injectable()
export class RoleRepo {
  public async getRoleByName(role: string) {
    const getedRole = await database.Role.findOne({
      where: {name: role},
    });

    return getedRole;
  }

}
