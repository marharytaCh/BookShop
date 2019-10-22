import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { LoggerMiddleware, AllExceptionFilter, LocalStrategy, JwtStrategy, RolesGuard } from 'src/common/index';

import { UserController, BooksController, AuthController } from 'src/controllers/index';
import { AppController } from 'src/app.controller';

import { BooksService, UserService, AuthService } from 'src/services/index';
import { Environment, environment } from 'src/environment/index';
import { AuthModule } from 'src/auth.module';

const env: Environment = environment();
@Module({
  imports: [ // MongooseModule.forRoot('mongodb://localhost/nest'),
          // AuthModule,
            PassportModule.register({defaultStrategy: 'jwt'}),
          JwtModule.register({
            secret: env.tokenSecret,
            signOptions: { expiresIn: '60s' },
          },
        ),
      ],
  controllers: [AppController, BooksController, UserController, AuthController],
  providers: [BooksService, AuthService, UserService, LocalStrategy, JwtStrategy,
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
