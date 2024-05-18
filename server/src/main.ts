import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environments } from 'config/enviroments';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  const options: CorsOptions = {
    origin: environments.corsOrigin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  };

  app.setGlobalPrefix('api');

  app.enableCors(options);

  await app.listen(environments.port);
}
bootstrap();
