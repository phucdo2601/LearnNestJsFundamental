import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReviewDto {

    @ApiProperty()
    @IsNotEmpty({
        message: "Product should not be empty."
    })
    @IsNumber({}, {
        message: "Product should be number."
    })
    producId: number;

    @ApiProperty()
    @IsNotEmpty({
        message: "Ratings should not be empty."
    })
    @IsNumber({}, {
        message: "Ratings should be number."
    })
    ratings: number;

    @ApiProperty()
    @IsNotEmpty({
        message: "Comment should not be empty."
    })
    @IsString()
    comment: string;
}
