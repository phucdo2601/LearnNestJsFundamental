import { ApiProperty } from "@nestjs/swagger";
import { Article } from "@prisma/client";
import { UserEntity } from "src/users/entities/user.entity";

export class ArticleEntity implements Article {
    /**
     * update the implementation of the ArticleEntity class and make sure it initializes the author property with an instance of UserEntity
     */
    constructor({ author, ...data }: Partial<ArticleEntity>) {
        Object.assign(this, data);
    
        if (author) {
          this.author = new UserEntity(author);
        }
    }
    
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

    @ApiProperty({
        required: false,
        nullable: true
    })
    authorId: number |  null;

    @ApiProperty({ required: false, type: UserEntity })
    author?: UserEntity;
}