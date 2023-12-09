import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * set up using methods to make it available globally in your application:
   */
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  const config = new DocumentBuilder()
    .setTitle('Learn-Fun-Nestjs-Api-Swagger')
    .setDescription('Swagger Description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3030);
}
bootstrap();
