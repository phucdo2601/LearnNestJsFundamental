import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
    // all headers that clients are allowed to use
    allowedHeaders: [
      'Accept',
      'Authorization',
      'Content-Type',
      'X-Requested-With',
      'apollo-require-preflight'
    ],
    methods: [
      'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'
    ],
  });

  // Config Cookies Parser
  app.use(cookieParser());

  // Config GraphQL Upload
  app.use(graphqlUploadExpress({
    maxFileSize: 10000000000, // 1GB
    maxFiles: 1, // 1 file
  }));

  // Config Validations
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.reduce((accumulator, error) => {
          accumulator[error.property] = Object.values(error.constraints).join(',',);
          return accumulator;
        }, {});

        throw new BadRequestException(formattedErrors);
      }
    })
  );

  await app.listen(3000);
}
bootstrap();
