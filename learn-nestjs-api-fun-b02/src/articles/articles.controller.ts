import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}


  @Get()
  @ApiOkResponse({
    type: ArticleEntity, isArray: true,
  })
  findAll() {
    return this.articlesService.findAll();
  }

  @Get('drafts')
  @ApiOkResponse({
    type: ArticleEntity, isArray: true,
  })
  async findArticleDraft() {
    return await this.articlesService.findArticleDrafts();
  }

  //get article by id
  // @Get(':id')
  // @ApiOkResponse({
  //   type: ArticleEntity, 
  // })
  // async findArticleById(@Param('id', ParseIntPipe) articleId: number) {
  //   return await this.articlesService.findOne(articleId);
  // }

  @Get(':id')
  @ApiOkResponse({
    type: ArticleEntity, 
  })
  async findArticleById(@Param('id') articleId: string) {
    const article = await this.articlesService.findOne(+articleId);
    if (!article) {
      throw new NotFoundException(`Article with${articleId} does not exist`);
    }
    return article;
  }

  //create new article
  @Post()
  @ApiCreatedResponse({
    type: ArticleEntity,
  })
  async createNewArticle(@Body() createActicle: CreateArticleDto) {
    return await this.articlesService.createNewArticle(createActicle);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: ArticleEntity,
  })
  async updateArticle(@Param('id', ParseIntPipe) id: number, @Body() updateArticleDto: UpdateArticleDto) {
    return await this.articlesService.updateArticle(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async deleteArticle(@Param('id', ParseIntPipe) id: number) {
    return await this.articlesService.deleteArticle(id);
  }
}
