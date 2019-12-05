import { Controller, Get, UseGuards, Post, Body, UseFilters, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthService, UserService } from 'src/services';
import { AllExceptionFilter } from 'src/common/exception.filter';
import { Token } from 'src/models/token.model';
import { CreateUserModel, ResetPassword, ChangePassword, UserModel, UserInfoModel } from 'src/models';
import { UserDocument } from 'src/documents';
import { Hash } from 'src/common';
import { User } from 'src/entity';

@ApiBearerAuth()
@ApiUseTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              private userService: UserService,
              public passwordHelper: Hash,
  ) { }

  @UseGuards(AuthGuard('local'))
  @UseFilters(new AllExceptionFilter())
  @Post('login')
  public async login(@Request() req): Promise<Token> {
    const accessToken: string = this.authService.getToken(req.user);
    const refreshToken: string = this.authService.getRefresh(req.user);
    const myTokens: Token = {
      accessToken,
      refreshToken,
    };

    return  myTokens;
  }

  @Post('register')
  public async addUser(@Request() req, @Body() createUser: CreateUserModel): Promise<UserInfoModel> {
    const user: UserInfoModel = await this.userService.addUser(createUser, req);

    return user;
  }

  // @Post('/resetPassword')
  // public async resetPassword(@Body() resetPassword: ResetPassword) {
  //   const user = await this.userService.resetPassword(resetPassword);

  //   return user;
  // }

  // @Post('/changePassword')
  // public async changePassword(@Body() changePassword: ChangePassword) {
  //   const updatedUser = await this.userService.changePassword(changePassword);

  //   return updatedUser;
  // }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('person')
  public async getProfile(@Request() req) {
    const user = await this.passwordHelper.hasUser(req);

    return user;
  }
}
