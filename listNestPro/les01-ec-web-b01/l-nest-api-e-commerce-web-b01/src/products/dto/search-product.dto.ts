import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";


export class SearchProductDto {
    @ApiProperty({
        required: false,
    })

    search?: string;

    @ApiProperty({
        required: false,
    })
    @IsNumber({}, {
        message: "Page Row limit input is a number!"
    })
    limit?: number;

    @ApiProperty({
        required: false,
    })
    @IsNumber({}, {
        message: "Category input is a number!"
    })
    category?: number;

    @ApiProperty({
        required: false,
    })
    @IsNumber({}, {
        message: "Min Price input is a number!"
    })
    minPrice?: number;

    @ApiProperty({
        required: false,
    })
    @IsNumber({}, {
        message: "Max Price input is a number!"
    })
    maxPrice?: number;

    @ApiProperty({
        required: false,
    })
    @IsNumber({}, {
        message: "Min rating input is a number!"
    })
    minRating?: number;

    @ApiProperty({
        required: false,
    })
    @IsNumber({}, {
        message: "Max rating input is a number!"
    })
    maxRating?: number;

    @ApiProperty({
        required: false,
    })
    @IsNumber({}, {
        message: "Page Number input is a number!"
    })
    pageNumber?: number;
}