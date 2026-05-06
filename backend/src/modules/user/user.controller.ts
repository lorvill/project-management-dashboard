import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Authorized } from '../auth/decorators/authorized.decorator';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  async getProfile(@Authorized('id') userId: string) {
    return this.userService.findById(userId);
  }

  @Auth('REGULAR')
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.findById(id);
  }
}
