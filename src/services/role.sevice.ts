import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { RoleRepo } from 'src/repositories';
import { RoleModel } from 'src/models';
import { Role } from 'src/entity';
import { Hash } from 'src/common';

@Injectable()
export class RoleService {
  constructor(public readonly roleRepo: RoleRepo,
              @Inject(forwardRef(() => Hash)) private readonly passwordHelper: Hash,
    ) {}
  public async getAll() {
    const roles: Role[] = await this.roleRepo.getAll();

    return roles;
  }

  public async getById(id: string): Promise<Role> {
    const role: Role = await this.roleRepo.getById(id);

    return role;
  }
  public async addRole(createRole: RoleModel): Promise<Role> {
      const role: Role = new Role();
      role.name = createRole.name;
      role.id = this.passwordHelper.generateId();

      const saveRole: Role = await this.roleRepo.addRole(role);

      return saveRole;
  }

  public async delete(id: string) {
    const deletedRole = await this.roleRepo.delete(id);

    return deletedRole;
  }
}
