import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { UserSignInDto } from "./user-signin.dto";
import { Roles } from "src/utility/common/user-roles.enum";

export class UserSignUpDto extends UserSignInDto{
    @IsNotEmpty({
        message: "Name can not be null"
    })
    @IsString({
        message: "Name Should be String"
    })
    @ApiProperty()
    name: string;

    @ApiProperty()
    roles: Roles[]
}