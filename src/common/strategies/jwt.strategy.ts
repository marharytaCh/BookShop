import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-strategy';
import { ExtractJwt } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { User } from 'src/services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: jwtConstants.secret, // here must be token from Env
    });
  }

  async validate(payload: User) {
    const user = { userId: payload.userId, username: payload.username };
    if (!user) {
      throw new UnauthorizedException();
    }
    return  user;
  }
}
