import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { BooksModule } from './books/books.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { BooksController } from './books/books.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './common/exception.filter';

@Module({
  imports: [BooksModule],
  controllers: [AppController],
  providers: [{
    provide: APP_FILTER,
    useClass: HttpErrorFilter ,
  },
],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(BooksController);
  }
}
