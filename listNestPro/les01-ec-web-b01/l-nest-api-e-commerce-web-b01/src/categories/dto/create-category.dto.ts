import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    
    @IsNotEmpty({
        message: "Title can not be empty"
    })
    @IsString({
        message: "Title should be string"
    })
    @ApiProperty()
    title: string;

    @IsNotEmpty({
        message: "description can not be empty"
    })
    @IsString({
        message: "description should be string"
    })
    @ApiProperty()
    description: string;
}
