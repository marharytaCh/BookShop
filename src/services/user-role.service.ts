import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UserRoleRepo } from 'src/repositories';
import { Hash } from 'src/common';
import { RoleInUsersModel } from 'src/models/roles/role-user.model';
import { UserInRole } from 'src/entity';

@Injectable()
export class UserRoleService {
  constructor(public readonly userRoleRepo: UserRoleRepo,
              @Inject(forwardRef(() => Hash)) private readonly passwordHelper: Hash,
    ) {}

  public async getAll(): Promise<UserInRole[]> {
    const usersInRole: UserInRole[] = await this.userRoleRepo.getAll();

    return usersInRole;
  }

  public async getById(id: string) {
    const roleInUser =  await this.userRoleRepo.getById(id);

    return roleInUser;
  }
  public async addUserInRole(createdRoleInUser: RoleInUsersModel): Promise<RoleInUsersModel> {
    const userRole: UserInRole = new UserInRole();
    userRole.id = this.passwordHelper.generateId();
    userRole.userId = createdRoleInUser.userId;
    userRole.roleId = createdRoleInUser.roleId;

    const saveUserInRole: RoleInUsersModel = await this.userRoleRepo.addUserInRole(userRole);

    return saveUserInRole;
  }
}
