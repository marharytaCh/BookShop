import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { environment } from './environment/environment';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    const result = environment();
    return result;
    // this.appService.getHello()
  }
}
