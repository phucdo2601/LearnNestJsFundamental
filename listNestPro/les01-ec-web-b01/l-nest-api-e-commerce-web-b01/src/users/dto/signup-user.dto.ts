import { ApiProperty } from "@nestjs/swagger";

export class SignUpUserDto {
    @ApiProperty()
    name: string;
    @ApiProperty({required:true})
    email: string;
    @ApiProperty({required:true})
    password: string;

    @ApiProperty()
    roles: []
}