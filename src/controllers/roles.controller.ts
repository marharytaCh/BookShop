import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { Controller, Body, Post, Get, Param, Delete } from '@nestjs/common';
import { Role } from 'src/entity';
import { RoleModel } from 'src/models/roles/role.model';
import { RoleService } from 'src/services';

@ApiBearerAuth()
@ApiUseTags('Roles')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @ApiOperation({ title: 'Creste user'})
  @Get()
  public async getAll(): Promise<Role[]> {
    const roles: Role[] = await this.roleService.getAll();

    return roles;
  }

  @Get(':id')
  public async getById(@Param('id') id: string): Promise<Role> {
    const role: Role =  await this.roleService.getById(id);

    return role;
  }

  @ApiOperation({ title: 'Creste user'})
  @Post()
  public async create(@Body() createdRole: RoleModel): Promise<Role> {
    const role: Role = await this.roleService.addRole(createdRole);

    return role;
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<number> {
    const role: number = await this.roleService.delete(id);

    return role;
  }
}
