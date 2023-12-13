import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Config default web path on this project
   */
  app.setGlobalPrefix('api/v1');

        message: "Password minimun character should be 5."

  /**
   * Config validation on this project
   */
  app.useGlobalPipes(new ValidationPipe({
    /**
     * If set to true, validator will strip validated (returned) object of any properties that do 
     * not use any validation decorators.
     */
    whitelist: true
  }));

  const swaggerConfig = new DocumentBuilder()
      .setTitle("Learn-Ec-NestJs-RestAPI-B01")
      .setDescription("The API for Eccommerce web b01")
      .setVersion("0.1")
      .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger/api', app, swaggerDocument);


  await app.listen(3030);
}
bootstrap();
