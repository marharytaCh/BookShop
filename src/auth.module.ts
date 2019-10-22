import { Module } from '@nestjs/common';
import { AuthService } from 'src/services';
import { LocalStrategy, JwtStrategy } from 'src/common/index';
// import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { environment, Environment } from './environment';

const env: Environment = environment();

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: env.tokenSecret,
            signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
