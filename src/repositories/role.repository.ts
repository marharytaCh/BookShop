import { Injectable } from '@nestjs/common';
import database = require('src/entity');
import { Role } from 'src/entity';

@Injectable()
export class RoleRepo {

  public async getAll(): Promise<Role[]> {
    const roles: Role[] = await database.Role.findAll();

    return roles;
  }

  public async getById(id: string): Promise<Role> {
    const role: Role = await database.Role.findOne({
      where: {id},
    });

    return role;
  }
  public async getRoleByName(role: string) {
    const getedRole = await database.Role.findOne({
      where: {name: role},
    });

    return getedRole;
  }

  public async addRole(role: Role) {
    const newRole: Role = await role.save();

    return newRole;
  }

  public async delete(id: string) {
    const deletedRole = await database.Role.destroy({
      where: {id},
    });

    return deletedRole;
  }

}
