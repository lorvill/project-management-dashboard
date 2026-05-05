import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from "@nestjs/common";
import session from "express-session";
import {RedisStore} from "connect-redis";
import { createClient } from 'redis';
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService)

  const redis = createClient({
    url: config.getOrThrow<string>('REDIS_URL'),
  });

  redis.on('error', (err) => {
    console.error('Redis Client Error', err);
  });

  await redis.connect()

  app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET'))) //middleware for reading cookies, checking signed cookies, parsing and add to req.cookies

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }))

  app.use(
      session({
        secret: config.getOrThrow<string>('SESSION_SECRET'),
        name: config.getOrThrow('SESSION_NAME'),
        resave: false,
        saveUninitialized: false,
        cookie: {
          domain: config.getOrThrow('SESSION_DOMAIN'),
          maxAge: 24 * 60 * 60 * 1000,
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
        },
        store: new RedisStore({
          client: redis,
          prefix: config.getOrThrow('SESSION_FOLDER')
        })
      })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(config.getOrThrow<number>('PORT') ?? 5004)
}
bootstrap();
