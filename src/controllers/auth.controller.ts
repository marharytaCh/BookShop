import { Controller, Get, UseGuards, Post, Body, UseFilters, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthService } from 'src/services/index';
import { AllExceptionFilter } from 'src/common/exception.filter';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { Roles } from 'src/common/roles/roles.decorator';
import { Token } from 'src/models/token.model';
import { LoginUserModel } from 'src/models/login.model';

@ApiBearerAuth()
@ApiUseTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseFilters(new AllExceptionFilter())
  @Post('login')
  public async login(@Body() loginModel: LoginUserModel) {
    loginModel.token = await this.authService.getToken(loginModel);

    return loginModel;
    // const accessToken = this.authService.getToken(loginModel);
    // const refreshToken = this.authService.getRefresh(loginModel);
    // const myToken: Token = {
    //   accessToken,
    //   refreshToken,
    // };
    // return  myToken;
  }

  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  // @Get('person')
  // pudlic async getProfile(@Request() req) {
  //   const user: LoginUserModel = await this.authService.userPayload(req);

  //   return user;
  // }
}
