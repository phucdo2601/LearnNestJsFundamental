import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
    
    @ApiProperty()
    name?: string;

    @ApiProperty()
    oldPassword?: string;

    @ApiProperty()
    newPassword?: string;

}
