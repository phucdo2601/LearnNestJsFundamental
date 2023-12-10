import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { Exclude } from "class-transformer";

export class UserEntity implements User {

    /**
     *
     */
    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
        
    }

    @ApiProperty()
    id: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    /**
     * Use the @Exclude() decorator to exclude the password field in the UserEntity class:
     */
    @Exclude()
    password: string;
}
