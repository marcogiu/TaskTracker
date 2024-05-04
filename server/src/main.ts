import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environments } from 'config/enviroments';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.map((error) => ({
          property: error.property,
          constraints: error.constraints,
        }));
        return new BadRequestException({ validationErrors: messages });
      },
    }),
  );

  await app.listen(environments.port);
}
bootstrap();
