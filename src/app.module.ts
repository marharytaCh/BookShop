import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { LoggerMiddleware, AllExceptionFilter, LocalStrategy } from 'src/common/index';

import { UserController, BooksController, AuthController } from 'src/controllers/index';
import { AppController } from 'src/app.controller';

import { BooksService, UserService, AuthService } from 'src/services/index';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'),
            PassportModule],
  controllers: [AppController, BooksController, UserController],
  providers: [BooksService, UserService, AuthService, LocalStrategy,
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
