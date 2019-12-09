import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { RoleService } from 'src/services';
import { RoleInUsersModel } from 'src/models/roles/role-user.model';
import { UserRoleService } from 'src/services/user-role.service';
import { UserInRole } from 'src/entity';

@ApiUseTags('User with Role')
@Controller('userRole')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) { }

  @Get()
  public async getAll(): Promise<UserInRole[]> {
    const usersInRole: UserInRole[] = await this.userRoleService.getAll();

    return usersInRole;
  }

  @Get(':id')
  @ApiOperation({ title: 'Search role in user by id' })
  public async getById(@Param() params) {
    const userInRole = await this.userRoleService.getById(params.id);

    return userInRole;
  }

  @ApiOperation({ title: 'Creste role in user'})
  @Post()
  public async create(@Body() createdRoleInUser: RoleInUsersModel): Promise<RoleInUsersModel> {
    const roleInUser: RoleInUsersModel = await this.userRoleService.addUserInRole(createdRoleInUser);

    return roleInUser;
  }
}
