import { Controller, Get, UseGuards, Post, Body, UseFilters } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthService } from 'src/services/index';
import { AllExceptionFilter } from 'src/common/exception.filter';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { Roles } from 'src/common/roles/roles.decorator';

export interface Token {
  accessToken: string;
  refreshToken: string;
}

@ApiBearerAuth()
@ApiUseTags('Authentification')
@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseFilters(new AllExceptionFilter())

  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Body() req) {
    const accessToken = this.authService.getToken(req);
    const refreshToken = this.authService.getRefresh(req);
    const myToken: Token = {
      accessToken,
      refreshToken,
    };
    return  myToken;
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('person')
  @Roles('user')
  getProfile(@Body() req) {
    return req.user;
  }
}
