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

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  async register(req: Request, dto: RegisterDto): Promise<User> {
    const isExist = await this.userService.findByEmail(dto.email);
    if (isExist) throw new ConflictException('Email already exists');

    const createNewUser = await this.userService.create(
      dto.email,
      dto.password,
      dto.name,
      '',
      AuthMethod.CREDENTIALS,
      false,
    );

    // @ts-ignore
    return this.saveSession(req, createNewUser);
  }

  async login(req: Request, dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user || !user.password)
      throw new NotFoundException('User is not found.');

    const isValidPassword = await verify(user.password, dto.password);
    if (!isValidPassword)
      throw new UnauthorizedException('Incorrect email or password');

    return this.saveSession(req, user);
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

    const account = await this.prismaService.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: 'google',
          providerAccountId: profile.googleId,
        },
      },
      include: {
        user: true,
      },
    });

    if (account) {
      return account.user;
    }

    let user = await this.userService.findByEmail(profile.email);

    if (!user) {
      user = await this.userService.create(
        profile.email,
        '',
        profile.name,
        profile.picture,
        AuthMethod.GOOGLE,
        true,
      );
    }

    await this.prismaService.account.create({
      data: {
        type: 'oauth',
        provider: 'google',
        providerAccountId: profile.googleId,
        userId: user.id,
      },
    });

    return user;
  }

  async logout(req: Request, res: Response): Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          return reject(new InternalServerErrorException(err.message));
        }
      });
      res.clearCookie(this.configService.getOrThrow('SESSION_NAME'));
      resolve();
    });
  }

  async saveSession(req: Request, user: User) {
    return new Promise((resolve, reject) => {
      req.session.userId = user.id;
      req.session.save((err) => {
        if (err) {
          console.log('SESSION SAVE ERROR:', err);
          return reject(new InternalServerErrorException(err.message));
        }
        resolve({
          user,
        });
      });
    });
  }
}
