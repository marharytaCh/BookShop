import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-strategy';
import { ExtractJwt } from 'passport-jwt';
import { UserModel } from 'src/models';
import { Environment, environment } from 'src/environment';

const env: Environment = environment();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: env.tokenSecret,
    });
  }

  async validate(payload: UserModel) {
    const user = await { userId: payload.id, username: payload.username, role: payload.userRole };
    if (!user) {
      throw new UnauthorizedException();
    }
    return  user;
  }
}
