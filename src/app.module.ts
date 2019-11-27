import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { LoggerMiddleware, AllExceptionFilter, LocalStrategy, JwtStrategy, RolesGuard, Hash, databaseProviders } from 'src/common';

import { UserController, BooksController, AuthController, AuthorController } from 'src/controllers';
import { AppController } from 'src/app.controller';

import { BooksService, UserService, AuthService, AuthorService } from 'src/services';

import { Environment, environment } from 'src/environment/index';

import { AuthorRepo, BookRepo, UserRepo } from 'src/repositories';
import { MulterModule } from '@nestjs/platform-express';

const env: Environment = environment();
@Module({
  imports: [
            PassportModule.register({defaultStrategy: 'jwt'}),
          JwtModule.register({
            secret: env.tokenSecret,
            signOptions: { expiresIn: environment().tokenExpireIn},
          },
        ),
        MulterModule.register({
          dest: './images',
        }),
      ],
  controllers: [AppController, BooksController, UserController, AuthController, AuthorController],
  providers: [BooksService, AuthService, AuthorService, UserService, LocalStrategy, JwtStrategy, ...databaseProviders,
    BookRepo, AuthorRepo, UserRepo, Hash,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
      },
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
