import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('context', context)
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      console.log('no role')
      return true;
    }

    const jwt = require('jsonwebtoken');
    console.log('after require')
    const request = context.switchToHttp().getRequest();
    console.log('request', request.headers)
    let auth: string = request.headers.authorization;
    console.log('auth', auth)
    auth = auth.substring('Bearer '.length).trim();
    console.log('auth', auth)
    const user = jwt.decode(auth);
    console.log('after user')
    const hasRole: boolean = roles.includes(user.role);
    if (hasRole) {

      console.log('hes role log')
      return hasRole;
    }
    throw new HttpException('You can not do this', HttpStatus.UNAUTHORIZED);
  }
}
