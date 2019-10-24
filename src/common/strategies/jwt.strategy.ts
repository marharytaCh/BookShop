import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-strategy';
import { ExtractJwt } from 'passport-jwt';
import { User } from 'src/models';
import { Environment, environment } from 'src/environment';

const env: Environment = environment();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: env.tokenSecret, // here must be token from Env
    });
  }

  async validate(payload: User) {
    const user = await { userId: payload.userId, username: payload.username, role: payload.role };
    if (!user) {
      throw new UnauthorizedException();
    }
    return  user;
  }
}
