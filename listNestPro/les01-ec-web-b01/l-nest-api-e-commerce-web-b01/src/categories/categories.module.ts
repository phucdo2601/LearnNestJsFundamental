import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      /**
      * import CategoryEntity for using this entity on this resource
      */
      CategoryEntity
    ])
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [
    CategoriesService
  ]
})
export class CategoriesModule {}
