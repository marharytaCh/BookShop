import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from 'src/services';
import { UserModel, CreateUserModel } from 'src/models';
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
  public async addUser(@Body() userModel: CreateUserModel) {
    const user: UserDocument = await this.userService.addUser(userModel);

    return user;
  }
}
