import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    if (!token || !token.startsWith('Bearer ')) {
      console.log(token);
      console.log(token.startsWith('Bearer '));
      throw new UnauthorizedException('Вы не авторизованы');
    }
    return true;
  }
}
