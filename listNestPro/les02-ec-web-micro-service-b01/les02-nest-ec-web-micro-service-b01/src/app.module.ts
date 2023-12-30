import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import config from 'config';
import { ConnectOptions } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(config.get('mongodbUrl')),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
