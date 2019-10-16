import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { BooksModule } from './books/books.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { BooksController } from './books/books.controller';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/exception.filter';
import { LoggerModule } from './common/logger.module';
import { AppLogger } from './common/applogger.service';

@Module({
  imports: [BooksModule, LoggerModule],
  controllers: [AppController],
  providers: [{
    provide: APP_FILTER,
    useClass: AllExceptionsFilter ,
  },
],
exports: [LoggerModule]
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(BooksController);
  }
  constructor(private readonly logger: AppLogger) {
    logger.log(`NODE_ENV=${process.env.NODE_ENV}`, 'AppModule');
  }
}
