import { Controller, Get, UseGuards, Post, Body, UseFilters, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthService } from 'src/services/index';
import { AllExceptionFilter } from 'src/common/exception.filter';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { Roles } from 'src/common/roles/roles.decorator';
import { Token } from 'src/models/token.model';

@ApiBearerAuth()
@ApiUseTags('Authentification')
@Controller('auth')
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

  @UseGuards(AuthGuard('jwt'))
  @Get('person')
  getProfile(@Request() req) {
    console.log(req);
    return req.body;
  }
}
