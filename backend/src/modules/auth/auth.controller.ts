import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import * as express from 'express';
import { LoginDto } from './dto/login.dto';
import { Roles } from './decorators/roles.decorator';
import { Recaptcha } from '@nestlab/google-recaptcha';
import { User } from '../../../generated/prisma/client';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

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

  @Get('google')
  @UseGuards(PassportAuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(PassportAuthGuard('google'))
  async googleCallback(
    @Req() request: express.Request,
    @Res() response: express.Response,
  ) {
    await this.authService.saveSession(request, request.user as User);
    return response.redirect('http://localhost:3000');
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email);
  }

  @Put('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto.token, dto.newPassword);
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
