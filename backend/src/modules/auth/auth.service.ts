import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { AuthMethod, User } from '../../../generated/prisma/client';
import { Request, Response } from 'express';
import { verify } from 'argon2';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { AccountService } from '../account/account.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly accountService: AccountService,
  ) {}

  async register(req: Request, dto: RegisterDto) {
    const isExist = await this.userService.findByEmail(dto.email);
    if (isExist)
      throw new ConflictException('Email already exists');

    const createUser = await this.userService.create(
      dto.email,
      dto.name,
      '',
      AuthMethod.CREDENTIALS,
      false,
    );

    await this.accountService.createCredentialsAccount(
      dto.email,
      dto.password,
      createUser.id,
    );

    return this.saveSession(req, createUser);
  }

  async login(req: Request, dto: LoginDto) {
    const account = await this.accountService.findCredentialsAccount(dto.email);
    if (!account || !account.password)
      throw new NotFoundException('User is not found.');

    const isValidPassword = await verify(account.password, dto.password);
    if (!isValidPassword)
      throw new UnauthorizedException('Incorrect email or password');

    return this.saveSession(req, account.user);
  }

  async validateGoogleUser(profile: {
    googleId: string;
    email: string;
    name: string;
    picture: string;
  }): Promise<User> {
    if (!profile.email) {
      throw new UnauthorizedException('Google account email is required.');
    }

    const account = await this.accountService.findGoogleAccount(profile.googleId);

    if (account) {
      return account.user;
    }

    let user = await this.userService.findByEmail(profile.email);

    if (!user) {
      user = await this.userService.create(
        profile.email,
        profile.name,
        profile.picture,
        AuthMethod.GOOGLE,
        true,
      );
    }

    await this.accountService.createGoogleAccount(user.id, profile.googleId);

    return user;
  }

  async logout(req: Request, res: Response): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          return reject(new InternalServerErrorException(err.message));
        }
        resolve();
      });
    });

    res.clearCookie(this.configService.getOrThrow('SESSION_NAME'));
  }

  async saveSession(req: Request, user: User) {
    return new Promise<{ user: User }>((resolve, reject) => {
      req.session.userId = user.id;

      req.session.save((err) => {
        if (err) {
          console.log('SESSION SAVE ERROR:', err);
          return reject(new InternalServerErrorException(err.message));
        }

        resolve({ user });
      });
    });
  }
}
