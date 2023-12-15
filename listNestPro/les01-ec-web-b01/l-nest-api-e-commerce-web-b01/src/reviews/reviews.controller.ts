import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUserDecorator } from 'src/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(AuthenticationGuard)
  @Post()
  async create(@Body() createReviewDto: CreateReviewDto, @CurrentUserDecorator() currentUser: UserEntity) {
    return await this.reviewsService.create(createReviewDto, currentUser);
  }

  @Get()
  async findAll() {
    return await this.reviewsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return await this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
