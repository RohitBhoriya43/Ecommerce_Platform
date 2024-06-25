// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { RolesNotMatchedException } from 'src/comman/exceptions/role-exception';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }
    console.log("requiredRoles",requiredRoles)
    const request = context.switchToHttp().getRequest();
    // const authorization = request.headers.authorization
    // if (!authorization || !authorization.startsWith('Bearer ')) {
    //   return false;
    // }
    // const decodedToken = this.jwtService.verify(authorization.split('Bearer ')[1])
    // if (!decodedToken || !decodedToken.username) {
    //   return false;
    // }

    // console.log("request",request)
    const user = request.user;
    console.log("requiredRoles.some(role => user.role === role)",requiredRoles.some(role => user.roles.includes(role)))
    if (!requiredRoles.some(role => user.roles.includes(role))) {
      throw new RolesNotMatchedException();
    }
    return true;
    // return requiredRoles.some((role) => user.roles.includes(role));
  }
}
