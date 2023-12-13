import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from 'db/datas-source';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    /**
     * Import type orm with datasoruce connected with db (datas-source.ts) for connecting database
     */
    TypeOrmModule.forRoot(dataSourceOption),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
