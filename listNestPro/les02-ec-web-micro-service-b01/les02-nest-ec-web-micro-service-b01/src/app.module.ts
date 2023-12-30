import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import config from 'config';
import { ConnectOptions } from 'mongoose';
import { AllExceptionFilter } from './httpExceptionFilter';

@Module({
  imports: [
    MongooseModule.forRoot(config.get('mongodbUrl')),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_FILTER',
      useClass: AllExceptionFilter,
    }
  ],
})
export class AppModule {}
