import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { CurrentUserDecorator } from 'src/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderEntity } from './entities/order.entity';
import { AuthorizeGuardFunc } from 'src/utility/guards/authorization.guard';
import { Roles } from 'src/utility/common/user-roles.enum';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: "Create a new order!",
    description: "This is the main Description for creating a new order"
  })
  @UseGuards(AuthenticationGuard)
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @CurrentUserDecorator() currentUser: UserEntity): Promise<OrderEntity> {
    return await this.ordersService.create(createOrderDto, currentUser);
  }

  @ApiOperation({
    summary: "Find all orders!",
    description: "This is the main Description for fetching a order list."
  })
  @Get()
  async findAll(): Promise<OrderEntity[]> {
    return await this.ordersService.findAll();
  }

  @ApiOperation({
    summary: "Find order by id!",
    description: "This is the main Description for getting a order by id"
  })
  @Get(':id')
  async findOne(@Param('id') id: string) : Promise<OrderEntity>{
    return await this.ordersService.findOne(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: "Update order by id!",
    description: "This is the main Description for updating a order by id"
  })
  @UseGuards(AuthenticationGuard, AuthorizeGuardFunc([Roles.ADMIN]))
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateOrderStatusDto: UpdateOrderStatusDto, @CurrentUserDecorator() currentUser: UserEntity) {
    return await this.ordersService.update(+id, updateOrderStatusDto, currentUser);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: "Cancel order by id!",
    description: "This is the main Description for cancelling a order by id"
  })
  @UseGuards(AuthenticationGuard, AuthorizeGuardFunc([Roles.ADMIN]))
  @Put('cancelled/:id')
  async cancelled(@Param('id') id: string, @CurrentUserDecorator() currentUser: UserEntity) {
    return await this.ordersService.cancelled(+id, currentUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
