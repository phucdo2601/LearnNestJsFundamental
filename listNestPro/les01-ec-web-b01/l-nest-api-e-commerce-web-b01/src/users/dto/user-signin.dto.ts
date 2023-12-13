import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UserSignInDto {
    @IsNotEmpty({
        message: "Email can not be empty"
    })
    @IsEmail({}, {
        message: "Please provide a valid email."
    })
    @ApiProperty({required:true})
    email: string;

    @IsNotEmpty({
        message: "Passwors is not empty!"
    })
    @MinLength(5, {
        message: "Password minimun character should be 5."
    })
    @ApiProperty({required:true})
    password: string;
}