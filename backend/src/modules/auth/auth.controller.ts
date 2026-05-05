import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req, Res,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import * as express from 'express';
import { LoginDto } from './dto/login.dto';
import { Roles } from './decorators/roles.decorator';
import { Recaptcha } from '@nestlab/google-recaptcha';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Recaptcha()
  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Req() request: express.Request, @Body() dto: RegisterDto) {
    return this.authService.register(request, dto);
  }

  @Recaptcha()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Req() request: express.Request, @Body() dto: LoginDto) {
    return this.authService.login(request, dto);
  }

  @Post('logout')
  @Roles('REGULAR')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req() request: express.Request,
    @Res({ passthrough: true }) response: express.Response,
  ) {
    return this.authService.logout(request, response);
  }
}

