import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateShippingDto {

    @ApiProperty()
    @IsNotEmpty({
        message: "Phone cannot be empty",
    })
    @IsString({
        message: "Phone format should be string",
    })
    phone: string;

    @ApiProperty()
    @IsOptional()
    @IsString({
        message: "Name format should be string",
    })
    name: string;

    @ApiProperty()
    @IsNotEmpty({
        message: "Address cannot be empty",
    })
    @IsString({
        message: "Address format should be string",
    })
    address: string;

    @ApiProperty()
    @IsNotEmpty({
        message: "City cannot be empty",
    })
    @IsString({
        message: "City format should be string",
    })
    city: string;

    @ApiProperty()
    @IsNotEmpty({
        message: "Post Code cannot be empty",
    })
    @IsString({
        message: "Post Code format should be string",
    })
    postCode: string;

    @ApiProperty()
    @IsNotEmpty({
        message: "State cannot be empty",
    })
    @IsString({
        message: "State format should be string",
    })
    state: string;

    @ApiProperty()
    @IsNotEmpty({
        message: "Country cannot be empty",
    })
    @IsString({
        message: "Country format should be string",
    })
    country: string;
}