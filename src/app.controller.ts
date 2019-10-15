import { Controller, Get } from '@nestjs/common';
import { environment } from './environment/environment';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getEnvironment(): any {
    const result = environment();
    return result;
    // this.appService.getHello()
  }
}
