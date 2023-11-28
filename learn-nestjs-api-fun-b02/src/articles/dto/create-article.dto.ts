import { ApiProperty } from '@nestjs/swagger';

/**
 * A DTO (Data Transfer Object) is an object that defines how the data will be sent over the network.
 */
export class CreateArticleDto {
    @ApiProperty()
    title: string;

    @ApiProperty({required: false})
    description?: string;

    @ApiProperty()
    body: string;

    @ApiProperty({required: false, default: false})
    published: boolean = false;
}
