import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";


export class SearchProductDto {
    @ApiProperty({
        required: false,
    })

    search?: string;

    @ApiProperty({
        required: false,
    })
    limit?: number;

    @ApiProperty({
        required: false,
    })
    category?: string;

    @ApiProperty({
        required: false,
    })
    minPrice?: number;

    @ApiProperty({
        required: false,
    })
    maxPrice?: number;

    @ApiProperty({
        required: false,
    })
    minRating?: number;

    @ApiProperty({
        required: false,
    })
    maxRating?: number;

    @ApiProperty({
        required: false,
    })
    offSet?: number;
}