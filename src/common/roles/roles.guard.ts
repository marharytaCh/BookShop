import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      console.log('no role')
      return true;
    }

    const jwt = require('jsonwebtoken');

    const request = context.switchToHttp().getRequest();

    let auth: string = request.headers.authorization;

    auth = auth.substring('Bearer '.length).trim();

    const user = jwt.decode(auth);

    const hasRole: boolean = roles.includes(user.role);
    if (hasRole) {

      return hasRole;
    }
    throw new HttpException('You can not do this', HttpStatus.UNAUTHORIZED);
  }
}
