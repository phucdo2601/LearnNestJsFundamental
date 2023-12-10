import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * set up using methods to make it available globally in your application:
   */
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  /**
   * Use the ClassSerializerInterceptor to remove a field from the response
   * First, enable ClassSerializerInterceptor globally by updating main.ts:
   */
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  

  const config = new DocumentBuilder()
    .setTitle('Learn-Fun-Nestjs-Api-Swagger')
    .setDescription('Swagger Description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  /**
   * Apply the exception filter to your entire application by updating the main.ts file:
   */
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(3030);
}
bootstrap();
