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

  // @Post()
  // addUser(
  //   @Body('firstname') userFirstName: string,
  //   @Body('lastname') userLastName: string,
  //   @Body('email') userEmail: string,
  //   @Body('password') userPassword: string,
  // ) {
  //   const generatedId = this.userService.insertUser(
  //     userFirstName,
  //     userLastName,
  //     userEmail,
  //     userPassword,

  //   );
  //   return { id: generatedId };
  // }
  // @Get('id/:id')
  //   @ApiOperation({ title: 'Search user by id' })
  //   public async get(@Param() params): Promise<User[]> {
  //       const user: User[] = await this.userService.getUserById(params.id);

  //       return user;
  //   }
}
