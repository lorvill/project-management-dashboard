import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const userId = request.session.userId;
    if (!userId) throw new UnauthorizedException('Not authorized.');

    const user = await this.userService.findById(userId);
    if (!user) throw new UnauthorizedException('Not authorized.');

    request.user = user;

    return true;
  }
}
