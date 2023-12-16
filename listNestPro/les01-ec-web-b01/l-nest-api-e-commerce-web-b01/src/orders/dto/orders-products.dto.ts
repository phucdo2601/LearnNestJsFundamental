import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";


export class OrdersProductsDto {

    @ApiProperty()
    @IsNotEmpty({
        message: "Product cannot be empty."
    })
    id: number;

    @ApiProperty()
    @IsNumber({
        maxDecimalPlaces:2
    }, {
        message: "Price should be number & max decimal precission 2"
    })
    @IsPositive({
        message: "Price cannot be Negative."
    })
    product_unit_price: number;

    @ApiProperty()
    @IsNumber({
        
    }, {
        message: "Quantity should be number"
    })
    @IsPositive({
        message: "Quantity cannot be Negative."
    })
    product_quantity: number;

    
}