import { ApiProperty } from "@nestjs/swagger";

/**
 * You will also need to define a new AuthEntity 
 * that will describe the shape of the JWT payload. Create a new file called auth.entity.ts
 */
export class AuthEntity {
    @ApiProperty()
    accessToken: string;
}