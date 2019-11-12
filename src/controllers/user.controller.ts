import { Controller, Get, Param, Post, Body, Put, Delete, Request } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from 'src/services';
import { UserModel, CreateUserModel, UpdateUserModel } from 'src/models';
import { UserDocument } from 'src/documents';
import { is } from '@babel/types';

@ApiUseTags('Users table')
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
  ) {}
  @Get()
  public async getAll(): Promise<UserModel[]> {
    const users: UserModel[] = await this.userService.getAll();

    return users;
  }

  @Get(':id')
  public async getbyId(@Param('id') id: UserDocument): Promise<UserModel> {
    const user: UserModel = await this.userService.getById(id);

    return user;
  }

  @Get(':offset/:limit')
  public async getPagination(@Param('offset') offset: string, @Param('limit') limit: string): Promise<UserModel[]> {
    const users: UserModel[] = await this.userService.getPagination(+offset, +limit);

    return users;
  }

  @Get(':mail/:token')
  public async verificateEmail(@Param('mail') mail: string, @Param('token') token: string) {
  console.log('hello')
  }

  @Post()
  public async addUser(@Request() req, @Body() userModel: CreateUserModel): Promise<UserModel> {
    const user: UserDocument = await this.userService.addUser(userModel, req);

    return user;
  }

  @Put()
  async update(@Body() updateUserModel: UpdateUserModel): Promise<UserModel> {
    const updatedUser: UserModel = await this.userService.update(updateUserModel);

    return updatedUser;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<UserModel> {
    const deletedUser: UserModel = await this.userService.delete(id);

    return deletedUser;
  }
}
