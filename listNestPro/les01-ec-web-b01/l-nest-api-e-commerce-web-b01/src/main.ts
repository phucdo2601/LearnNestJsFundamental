import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Config default web path on this project
   */
  app.setGlobalPrefix('api/v1');

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
