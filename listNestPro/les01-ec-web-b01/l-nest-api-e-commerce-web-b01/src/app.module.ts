import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from 'db/datas-source';

@Module({
  imports: [
    /**
     * Import type orm with datasoruce connected with db (datas-source.ts) for connecting database
     */
    TypeOrmModule.forRoot(dataSourceOption),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
