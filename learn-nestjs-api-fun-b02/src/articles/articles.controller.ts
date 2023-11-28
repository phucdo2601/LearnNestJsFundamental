import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}


  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get('drafts')
  async findArticleDraft() {
    return await this.articlesService.findArticleDrafts();
  }

  //get article by id
  @Get(':id')
  async findArticleById(@Param('id') articleId: string) {
    return await this.articlesService.findOne(+articleId);
  }

  //create new article
  @Post()
  async createNewArticle(@Body() createActicle: CreateArticleDto) {
    return await this.articlesService.createNewArticle(createActicle);
  }

  @Patch(':id')
  async updateArticle(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return await this.articlesService.updateArticle(+id, updateArticleDto);
  }

  @Delete(':id')
  async deleteArticle(@Param('id') id: string) {
    return await this.articlesService.deleteArticle(+id);
  }
}
