import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    console.log('JwtAuthGuard: Checking authentication...');
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    console.log('JwtAuthGuard: Handling request...');
    if (err || !user) {
      console.error('JwtAuthGuard Error:', err || 'User not found');
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
