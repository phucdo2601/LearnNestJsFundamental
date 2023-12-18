import { Module, forwardRef } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingEntity } from './entities/shipping.entity';
import { OrdersProductsEntity } from './entities/orders-products.entity';
import { OrderEntity } from './entities/order.entity';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    /**
      * import OrderEntity,ShippingEntity, OrdersProductsEntity  for using this entity on this resource
      */
    TypeOrmModule.forFeature([
      OrderEntity,
      ShippingEntity,
      OrdersProductsEntity
    ]),
    /**
     * Sử dụng forwardRef trong trường hợp cả hai resource sử export đều đang sử dụng lại chính tài nguyên của đối phương
     * Trong trường hợp này ở resource orders đang sử dụng tài nguyên của resource products để tham chiếu bussiness
     * và ngược lại ở resource products đang sử tài nguyên của orders để tham chiếu bussiness nên trong class .moudule.ts của
     * 2 resource ở phần import cần phải sử dụng forwardRef để đọc đc tài nguyên của mỗi resource.
     */
    forwardRef(() => ProductsModule),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [
    OrdersService
  ]
})
export class OrdersModule {}
