import { Type } from "class-transformer";
import { CreateShippingDto } from "./create-shipping.dto";
import { ValidateNested } from "class-validator";
import { OrdersProductsDto } from "./orders-products.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {

    @ApiProperty()
    @Type(() =>CreateShippingDto)
    @ValidateNested()
    shippingAddress: CreateShippingDto;

    /**
     * Add type on @ApiProperty for reading the type model of an array
     */
    @ApiProperty({ type: OrdersProductsDto, isArray: true })
    @Type(() =>OrdersProductsDto)
    @ValidateNested()
    ordersProducts: OrdersProductsDto[];
}
