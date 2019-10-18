import { Controller, Get, UseFilters, UseGuards, Post, Request } from '@nestjs/common';
import { environment } from './environment/environment';
import { AllExceptionFilter } from './common/exception.filter';
import { AuthGuard } from '@nestjs/passport';

@UseFilters(new AllExceptionFilter())
@Controller()
export class AppController {
  constructor() {}

  @Get()
  getEnvironment(): any {
    const result = environment();
    return result;
    // this.appService.getHello()
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}
