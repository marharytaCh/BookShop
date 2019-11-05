import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
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
  public async getbyId(@Param('id') id: UserDocument) {
    const user: UserModel = await this.userService.getById(id);

    return user;
  }

  @Post()
  public async addUser(@Body() userModel: CreateUserModel): Promise<UserModel> {
    const user: UserDocument = await this.userService.addUser(userModel);

    return user;
  }

  @Put()
  async update(@Body() updateUserModel: UpdateUserModel) {
    const updatedUser = await this.userService.update(updateUserModel);

    return updatedUser;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedUser: UserModel = await this.userService.delete(id);

    return deletedUser;
  }
}
