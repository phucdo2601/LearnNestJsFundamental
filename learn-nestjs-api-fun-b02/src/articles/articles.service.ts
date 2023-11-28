import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.article.findMany();
  }

  async findArticleDrafts() {
    return await this.prisma.article.findMany({
      where: {
        published: false,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.article.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createNewArticle(articleDto: CreateArticleDto) {
    return await this.prisma.article.create({
      data: articleDto,
    });
  }

  async updateArticle(id: number, articleDto: UpdateArticleDto) {
    return await this.prisma.article.update({
      where: {
        id: id,
      },
      data: articleDto,
    });
  }

  async deleteArticle(id: number) {
    return await this.prisma.article.delete({
      where: {
        id: id,
      },
    });
  }
}
