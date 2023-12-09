import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

/**
 * A DTO (Data Transfer Object) is an object that defines how the data will be sent over the network.
 * 
 * Implement and add validation decorators to CreateArticleDto. You will apply the following rules to CreateArticleDto:
 */
export class CreateArticleDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty()
    title: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @MaxLength(300)
    @ApiProperty({required: false})
    description?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    body: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({required: false, default: false})
    published: boolean = false;
}
