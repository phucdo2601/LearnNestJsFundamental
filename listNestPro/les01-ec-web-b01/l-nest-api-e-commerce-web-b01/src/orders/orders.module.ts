import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingEntity } from './entities/shipping.entity';
import { OrdersProductsEntity } from './entities/orders-products.entity';
import { OrderEntity } from './entities/order.entity';

@Module({
  imports: [
    /**
      * import OrderEntity,ShippingEntity, OrdersProductsEntity  for using this entity on this resource
      */
    TypeOrmModule.forFeature([
      OrderEntity,
      ShippingEntity,
      OrdersProductsEntity
    ])
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
