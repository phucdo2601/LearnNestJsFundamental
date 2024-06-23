import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

@InputType()
export class RegisterDto {

    @Field()
    @IsNotEmpty({
        message: "Full name is required"
    })

    @IsString({
        message: "Fullname must be a string"
    })
    fullName: string;

    @Field()
    @IsNotEmpty({
        message: "Email is required"
    })
    @IsEmail({}, {
        message: "Email must be a valid email"
    })
    email: string;

    @Field()
    @IsNotEmpty({
        message: "Confirm Password is required"
    })
    confirmPassword: string;

    @Field()
    @IsNotEmpty({
        message: "Password is required"
    })
    @MinLength(8, {
        message: "Password must be at least 8 characters."
    })
    password: string;
}

@InputType()
export class LoginDto {

    @Field()
    @IsNotEmpty({
        message: "Email is required"
    })
    @IsEmail({}, {
        message: "Email must be a valid email"
    })
    email: string;

    @Field()
    @IsNotEmpty({
        message: "Password is required"
    })
    password: string;
}