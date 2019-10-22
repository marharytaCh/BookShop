import { Controller, Get, UseFilters, UseGuards, Post, Request } from '@nestjs/common';
import { environment } from './environment/environment';
import { AllExceptionFilter } from './common/exception.filter';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/services/index';

@UseFilters(new AllExceptionFilter())
@Controller()
export class AppController {
  constructor( private readonly authService: AuthService) {}

  @Get()
  getEnvironment(): any {
    const result = environment();
    return result;
    // this.appService.getHello()
  }

  // @UseGuards(AuthGuard('local'))
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
