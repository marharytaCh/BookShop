import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { LoggerMiddleware, AllExceptionFilter } from 'src/common/index';

import { UserController, BooksController } from 'src/controllers/index';
import { AppController } from 'src/app.controller';

import { BooksService } from 'src/services/index';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest')],
  controllers: [AppController, BooksController, UserController],
  providers: [BooksService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
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
