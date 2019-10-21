import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflcetor: Reflector) {}
  canActive(context: ExecutionContext): boolean {
    const roles = this.reflcetor.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.body;
    const hasRole = () => user.roles.some((role) => roles.includes(role));
    // return user && user.roles && hasRole();

    if (user.role === roles) {
      return true;
    }
    return false;
  }
}
