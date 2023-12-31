import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { userTypes } from "src/shared/schema/user.schema";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password: string;
    
    @IsNotEmpty()
    @IsString()
    @IsIn([userTypes.ADMIN, userTypes.CUSTOMER])
    @ApiProperty()
    type: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    secretToken?: string;

    isVerified?: boolean;
}
