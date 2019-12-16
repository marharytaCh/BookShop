import { Controller, Get, Param, Post, Body, Put, Delete, Request, Res } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from 'src/services';
import { UserModel, UpdateUserModel } from 'src/models';
import { Roles } from 'src/common';
import { User } from 'src/entity';

@ApiUseTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
  ) {}

  @ApiOperation({title: 'Get all usres'})
  @Get()
  @Roles('admin')
  public async getAll(): Promise<User[]> {
    const users: User[] = await this.userService.getAll();

    return users;
  }

  @ApiOperation({title: 'Get user by id'})
  @Get(':id')
  @Roles('admin')
  public async getbyId(@Param('id') id: string): Promise<User> {
    const user: User = await this.userService.getById(id);

    return user;
  }

  @Get('/confirm/:email/:token')
  public async verificateEmail(@Param('email') email: string, @Param('token') token: string, @Res() res) {
    const user = await this.userService.getByEmail(email);
    const validate = await this.userService.isUserValid(token, user);

    return validate;
  }

  @ApiOperation({title: 'Update user'})
  @Put()
  async update(@Body() updateUserModel: UpdateUserModel): Promise<UserModel> {
    const updatedUser: UserModel = await this.userService.update(updateUserModel);

    return updatedUser;
  }

  @ApiOperation({title: 'Delete user'})
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<number> {
    const deletedUser: number = await this.userService.delete(id);

    return deletedUser;
  }
}
