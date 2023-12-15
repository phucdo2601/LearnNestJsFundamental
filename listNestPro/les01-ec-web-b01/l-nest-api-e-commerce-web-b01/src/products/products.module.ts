import { CategoriesModule } from './../categories/categories.module';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductEntity } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    /**
      * import ProductEntity for using this entity on this resource
      */
    TypeOrmModule.forFeature([
      ProductEntity
    ]),
    CategoriesModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [
    ProductsService
  ]
})
export class ProductsModule {}
