import { Controller, Get, Param, Post, Body, Put, Delete, Request } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from 'src/services';
import { UserModel, UpdateUserModel } from 'src/models';
import { UserDocument } from 'src/documents';
import { Roles } from 'src/common';

@ApiUseTags('Users table')
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
  ) {}
  @Get()
  @Roles('admin')
  public async getAll(): Promise<UserModel[]> {
    const users: UserModel[] = await this.userService.getAll();

    return users;
  }

  @Get(':id')
  @Roles('admin')
  public async getbyId(@Param('id') id: UserDocument): Promise<UserModel> {
    const user: UserModel = await this.userService.getById(id);

    return user;
  }

  @Get(':offset/:limit')
  public async getPagination(@Param('offset') offset: string, @Param('limit') limit: string): Promise<UserModel[]> {
    const users: UserModel[] = await this.userService.getPagination(+offset, +limit);

    return users;
  }

  @Get('/confirm/:email/:token')
  public async verificateEmail(@Param('email') email: string, @Param('token') token: string) {
    const user = await this.userService.findByUsername(email);
    const validate = await this.userService.isUserValid(token, user);

    return validate;
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
