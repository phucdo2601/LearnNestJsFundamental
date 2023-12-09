import { ApiProperty } from "@nestjs/swagger";
import { Article } from "@prisma/client";

export class ArticleEntity implements Article {
    
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty({
        required: false,
        nullable: true,
    })
    description: string | null;

    @ApiProperty()
    body: string;

    @ApiProperty()
    published: boolean;

    @ApiProperty()
    createAt: Date;

    @ApiProperty()
    updatedAt: Date;
}