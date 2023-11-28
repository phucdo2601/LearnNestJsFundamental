import { PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';

/**
 * The updateArticleDto definition is defined as a PartialType of CreateArticleDto. 
 * So it can have all the properties of CreateArticleDto.
 */
export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
