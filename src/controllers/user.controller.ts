import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from 'src/services';
import { UserModel, CreateUserModel, UpdateUserModel } from 'src/models';
import { UserDocument } from 'src/documents';

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

  @Post()
  public async addUser(@Body() userModel: CreateUserModel): Promise<UserModel> {
    const user: UserDocument = await this.userService.addUser(userModel);

    return user;
  }

  // @Put()
  // async update(@Body() updateUserModel: UpdateUserModel) {
  //   const updatedUser = await this.userService.update(updateUserModel);

  //   return updatedUser;
  // }
}
