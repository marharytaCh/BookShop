import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { BooksModule } from './books/books.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { BooksController } from './books/books.controller';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './common/exception.filter';
import { BooksService } from './books/books.service';
import { UserModule } from './user/user.module';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BooksModule, UserModule, AuthModule],
  controllers: [AppController, BooksController, UsersController],
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
