import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateProductDto {
    
    @ApiProperty()
    @IsNotEmpty({
        message: "title can not be blank."
    })
    @IsString({

    })
    title: string;

    @ApiProperty()
    @IsNotEmpty({
        message: "description can not be blank"
    })
    @IsString({

    })
    description: string;

    @ApiProperty()
    @IsNotEmpty({
        message: "price should not be empty."
    })
    @IsNumber({
        maxDecimalPlaces: 2
    }, {
        message: 'price should be number & max decimal precission 2.'
    })
    @IsPositive({
        message: "price should be positive number."
    })
    price: number;

    @ApiProperty()
    @IsNotEmpty({
        message: "stock should not be empty."
    })
    @IsNumber({
        
    }, {
        message: 'stock should be number.'
    })
    @Min(0, {
        message: "Price cannot be negative."
    })
    stock: number;

    @ApiProperty()
    @IsNotEmpty({
        message: "images should not be empty."
    })
    @IsArray({
        message: "images should be in array format."
    })
    images: string[];

    @ApiProperty()
    @IsNotEmpty({
        message: "category should not be empty."
    })
    @IsNumber({
        
    }, {
        message: 'category should be number.'
    })
    category: number;
}
