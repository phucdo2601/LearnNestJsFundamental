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
  async findAll() {
    const articles = await this.articlesService.findAll();
    return articles.map((article) => new ArticleEntity(article));
  }

  @Get('drafts')
  @ApiOkResponse({
    type: ArticleEntity, isArray: true,
  })
  async findArticleDraft() {
    const drafts = await this.articlesService.findArticleDrafts();
    return drafts.map((article) => new ArticleEntity(article));
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
    const article = new ArticleEntity(await this.articlesService.findOne(+articleId));
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
    return new ArticleEntity(new ArticleEntity(await this.articlesService.createNewArticle(createActicle)));
  }

  @Patch(':id')
  @ApiOkResponse({
    type: ArticleEntity,
  })
  async updateArticle(@Param('id', ParseIntPipe) id: number, @Body() updateArticleDto: UpdateArticleDto) {
    return new ArticleEntity(await this.articlesService.updateArticle(id, updateArticleDto));
  }

  @Delete(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async deleteArticle(@Param('id', ParseIntPipe) id: number) {
    return new ArticleEntity(await this.articlesService.deleteArticle(id));
  }
}
