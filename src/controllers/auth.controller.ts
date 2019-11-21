import { Controller, Get, UseGuards, Post, Body, UseFilters, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthService } from 'src/services/index';
import { AllExceptionFilter } from 'src/common/exception.filter';
import { Token } from 'src/models/token.model';
import { LoginUserModel } from 'src/models/login.model';
import { UserPayloadModel } from '../models/userPayload.model';

@ApiBearerAuth()
@ApiUseTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(AuthGuard('local'))
  @UseFilters(new AllExceptionFilter())
  @Post('login')
  public async login(@Request() req) {
    console.log(req)
    const accessToken: string = this.authService.getToken(req.user);
    const refreshToken: string = this.authService.getRefresh(req.user);
    const myTokens: Token = {
      accessToken,
      refreshToken,
    };

    return  myTokens;
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('person')
  public async getProfile(@Request() req) {
    console.log(req);
  }
}
