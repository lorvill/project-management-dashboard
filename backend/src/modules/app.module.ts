import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { IS_DEV_ENV } from '../libs/common/utils/is-dev.util';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { NotesModule } from './notes/notes.module';
import { PaginationModule } from './pagination/pagination.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    PassportModule.register({ session: true }),
    NotesModule,
    PaginationModule,
  ],
})
export class AppModule {}
