import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './infrastructure/modules/app.module.js';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true }
    }),
  );

  app.enableCors();
  app.setGlobalPrefix('api');

  app.use((req: any, res: any, next: any) => {
    const { method, originalUrl } = req;
    const logger = new Logger('HTTP');
    logger.log(`--> ${method} ${originalUrl}`);
    next();
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT', 3000);

  await app.listen(port);
}

void bootstrap();
