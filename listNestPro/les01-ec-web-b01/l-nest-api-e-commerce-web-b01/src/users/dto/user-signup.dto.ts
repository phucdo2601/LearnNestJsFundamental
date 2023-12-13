import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserSignUpDto {
    @IsNotEmpty({
        message: "Name can not be null"
    })
    @IsString({
        message: "Name Should be String"
    })
    @ApiProperty()
    name: string;

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

    @ApiProperty()
    roles: []
}