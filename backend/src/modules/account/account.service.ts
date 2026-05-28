import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class AccountService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCredentialsAccount(
    email: string,
    password: string,
    userId: string,
  ) {
    return this.prismaService.account.create({
      data: {
        type: 'credentials',
        provider: 'credentials',
        providerAccountId: email,
        password: await hash(password),
        userId,
      },
    });
  }

  async findCredentialsAccount(email: string) {
    return this.prismaService.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: 'credentials',
          providerAccountId: email,
        },
      },
      include: {
        user: true,
      },
    });
  }

  async findGoogleAccount(googleId: string) {
    return this.prismaService.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: 'google',
          providerAccountId: googleId,
        },
      },
      include: {
        user: true,
      },
    });
  }

  async createGoogleAccount(userId: string, googleId: string) {
    return this.prismaService.account.create({
      data: {
        type: 'oauth',
        provider: 'google',
        providerAccountId: googleId,
        userId,
      },
    });
  }
}
