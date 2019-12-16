import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { Controller, Body, Post, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { Role } from 'src/entity';
import { RoleModel } from 'src/models/roles/role.model';
import { RoleService } from 'src/services';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common';

@ApiBearerAuth()
@ApiUseTags('Roles')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Creste user'})
  @Get()
  @Roles('admin')
  public async getAll(): Promise<Role[]> {
    const roles: Role[] = await this.roleService.getAll();

    return roles;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @Roles('admin')
  public async getById(@Param('id') id: string): Promise<Role> {
    const role: Role =  await this.roleService.getById(id);

    return role;
  }
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Creste user'})
  @Post()
  @Roles('admin')
  public async create(@Body() createdRole: RoleModel): Promise<Role> {
    const role: Role = await this.roleService.addRole(createdRole);

    return role;
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @Roles('admin')
  public async delete(@Param('id') id: string): Promise<number> {
    const role: number = await this.roleService.delete(id);

    return role;
  }
}
