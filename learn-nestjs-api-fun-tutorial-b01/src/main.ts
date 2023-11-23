import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * pipe in nest: A pipe is a class annotated with the @Injectable() decorator, which implements the PipeTransform interface. Pipes have two typical use cases: transformation: transform input data to the desired form (e.g., from string to integer)
   */
  // using global pipe
  app.useGlobalPipes(new ValidationPipe({
    /**
     * whitelist:
     * If set to true, validator will strip validated (returned) object of any properties that do not use any validation decorators.
     */
    whitelist: true
  }));
  await app.listen(3030);
}
bootstrap();
