import { CategoriesModule } from './../categories/categories.module';
import { Module, forwardRef } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductEntity } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [
    /**
      * import ProductEntity for using this entity on this resource
      */
    TypeOrmModule.forFeature([
      ProductEntity
    ]),
    CategoriesModule,
    /**
     * Sử dụng forwardRef trong trường hợp cả hai resource sử export đều đang sử dụng lại chính tài nguyên của đối phương
     * Trong trường hợp này ở resource products đang sử dụng tài nguyên của resource orders để tham chiếu bussiness
     * và ngược lại ở resource orders đang sử tài nguyên của products để tạo hóa đơn nên trong class .moudule.ts của
     * 2 resource ở phần import cần phải sử dụng forwardRef để đọc đc tài nguyên của mỗi resource.
     */
    forwardRef(() => OrdersModule),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [
    ProductsService
  ]
})
export class ProductsModule {}
