import { Controller, Get, Param } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { UserService, User } from 'src/services';

@ApiUseTags('Users table')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) {}
  // @Get('id/:id')
  //   @ApiOperation({ title: 'Search user by id' })
  //   public async get(@Param() params): Promise<User[]> {
  //       const user: User[] = await this.userService.getUserById(params.id);

  //       return user;
  //   }
}
