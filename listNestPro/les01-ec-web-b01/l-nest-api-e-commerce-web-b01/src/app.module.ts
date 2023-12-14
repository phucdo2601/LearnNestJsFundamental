import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from 'db/data-source';
import { UsersModule } from './users/users.module';
import { CurrentUserMiddleWare } from './utility/middleware/current-user.middleware';

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleWare)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }

}
