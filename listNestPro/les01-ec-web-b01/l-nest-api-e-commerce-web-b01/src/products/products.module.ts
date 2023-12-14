import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductEntity } from './entities/product.entity';

@Module({
  imports: [
    /**
      * import ProductEntity for using this entity on this resource
      */
    ProductEntity
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
