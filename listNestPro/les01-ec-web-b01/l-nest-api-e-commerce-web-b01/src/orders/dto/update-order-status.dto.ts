import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { OrderStatus } from "../enums/order-status.enum";
import { ApiProperty } from "@nestjs/swagger";


export class UpdateOrderStatusDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsIn([
        OrderStatus.SHIPPED, OrderStatus.DELIVERED
    ])
    status: string;
}