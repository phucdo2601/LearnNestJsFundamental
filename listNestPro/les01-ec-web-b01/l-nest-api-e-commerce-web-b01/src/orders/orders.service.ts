import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrdersProductsEntity } from './entities/orders-products.entity';
import { ShippingEntity } from './entities/shipping.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderStatus } from './enums/order-status.enum';

@Injectable()
export class OrdersService {
  /**
   *
   */
  constructor(@InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrdersProductsEntity) private readonly opRepository: Repository<OrdersProductsEntity>,
    /**
     * Trong trường hợp cả 2 resource cùng sử dụng tài nguyên qua lại lẫn nhau thì sử dụng thêm @Inject(forwardRef(() => ServiceName)) để resource có thể nhận đc sử lý của nhau
     */
    @Inject(forwardRef(() => ProductsService)) private readonly productService: ProductsService
  ) {
    
  }

  async create(createOrderDto: CreateOrderDto, currentUser: UserEntity): Promise<OrderEntity> {
    const shippingEntity = new ShippingEntity();

    Object.assign(shippingEntity, createOrderDto.shippingAddress);

    const orderEntity = new OrderEntity();
    orderEntity.shippingAddress = shippingEntity;

    orderEntity.user = currentUser;

    const orderTbl = await this.orderRepository.save(orderEntity);

    let opEnity: {
      order: OrderEntity;
      product: ProductEntity;
      product_quantity: number;
      product_unit_price: number;
    }[] = [];

    for (let i = 0; i < createOrderDto.ordersProducts.length; i++) {
      const order = orderTbl;
      const product = await this.productService.findOne(createOrderDto.ordersProducts[i].id);
      const product_quantity = createOrderDto.ordersProducts[i].product_quantity;
      const product_unit_price = createOrderDto.ordersProducts[i].product_unit_price;
      
      opEnity.push({
        order: order,
        product: product,
        product_quantity: product_quantity,
        product_unit_price: product_unit_price
      })
    }

    const op = await this.opRepository.createQueryBuilder()
      .insert()
      .into(OrdersProductsEntity)
      .values(opEnity)
      .execute();

    return await this.findOne(orderTbl.id);
  }

  async findAll(): Promise<OrderEntity[]> {
    return await this.orderRepository.find({
      relations: {
        shippingAddress: true,
        user: true,
        products: {
          product: true,
        },
      },
    });
  }

  async findOne(id: number): Promise<OrderEntity> {
    return await this.orderRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        shippingAddress: true,
        user: true,
        products: {
          product: true,
        }
      }
    })
  }

  async findOneByProductId(id: number) {
    return await this.opRepository.findOne({
      where: {
        product: {
          id: id
        }
      },
      relations: {
        product: true
      }
    })
  }

  async update(id: number, updateOrderStatusDto: UpdateOrderStatusDto, currentUser: UserEntity) {
    let order = await this.findOne(id);

    if (!order) {
      throw new NotFoundException(`Order not found: ${id}`);
    }

    if (order.status === OrderStatus.DELIVERED || order.status === OrderStatus.CANCELLED) {
      throw new BadRequestException(`Order already ${order.status}`);
    }

    if (order.status === OrderStatus.PROCESSING && updateOrderStatusDto.status !== OrderStatus.SHIPPED) {
      throw new BadRequestException(`Delivery after shipped !!!`);
    }

    if (updateOrderStatusDto.status === OrderStatus.SHIPPED && order.status === OrderStatus.SHIPPED) {
      return order;
    }

    if (updateOrderStatusDto.status === OrderStatus.SHIPPED) {
      order.shippedAt = new Date();
    }

    if (updateOrderStatusDto.status === OrderStatus.DELIVERED) {
      order.deliveredAt = new Date();
    }

    order.status = updateOrderStatusDto.status;
    order.updatedBy = currentUser;
    order = await this.orderRepository.save(order);

    if (updateOrderStatusDto.status === OrderStatus.DELIVERED) {
      await this.stockUpdate(order, OrderStatus.DELIVERED);
    }

    return order;
  }

  async cancelled(id: number, currentUser: UserEntity) {
    let order = await this.findOne(id);

    if (!order) {
      throw new NotFoundException(`Order not found: ${id}`);
    }

    if (order.status === OrderStatus.CANCELLED) {
      return order;
    }

    order.status = OrderStatus.CANCELLED;
    order.updatedBy = currentUser;
    order = await this.orderRepository.save(order);

    await this.stockUpdate(order, OrderStatus.CANCELLED);

    return order;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  async stockUpdate(order: OrderEntity, status: string) {
    for(const op of order.products) {
      await this.productService.updateStock(op.product.id, op.product_quantity, status);
    }
  }
}
