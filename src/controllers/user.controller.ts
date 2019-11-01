import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from 'src/services';
import { User } from 'src/models';

@ApiUseTags('Users table')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) {}
@Get()
public async getAll() {
  const users = await this.userService.getAllUsers();
  console.log(users);
}
}
