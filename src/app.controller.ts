import { Controller, Get, UseFilters } from '@nestjs/common';
import { environment } from './environment/environment';
import { AllExceptionFilter } from './common/exception.filter';

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
}
