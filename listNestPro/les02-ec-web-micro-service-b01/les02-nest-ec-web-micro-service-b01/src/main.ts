import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import config from 'config'
import { TransformationInterceptor } from './responseInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Swagger configuration
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Learn NestJs FullStack API Documentation")
    .setDescription("The API for Eccommerce web b01")
    .setVersion("0.1")
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger/api', app, swaggerDocument);

  /**
   * basic using TransformationInterceptor for getting and handling data
   */
  app.useGlobalInterceptors(new TransformationInterceptor());

  await app.listen(config.get('port'), () => {
    return console.log(`Server is running on port ${config.get('port')}`);
  });
}
bootstrap();
