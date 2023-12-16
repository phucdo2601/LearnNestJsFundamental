import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUserDecorator } from 'src/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { ReviewEntity } from './entities/review.entity';
import { AuthorizeGuardFunc } from 'src/utility/guards/authorization.guard';
import { Roles } from 'src/utility/common/user-roles.enum';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: "Create review function",
    description: "This is the main Description for creating new reivew on this system!"
  })
  @UseGuards(AuthenticationGuard)
  @Post()
  async create(@Body() createReviewDto: CreateReviewDto, @CurrentUserDecorator() currentUser: UserEntity) {
    return await this.reviewsService.create(createReviewDto, currentUser);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get All list reviews function",
    description: "This is the main Description for fetching list reivews on this system!"
  })
  @Get()
  async findAll() {
    return await this.reviewsService.findAll();
  }

  @ApiOperation({
    summary: "Getting review by productId function",
    description: "This is the main Description for fetching list review by productId on this system!"
  })
  @Get('findAllByProduct/:id')
  async findAllByProduct(@Param('id', ParseIntPipe) productId: number) {
    return await this.reviewsService.findAllByProduct(productId);
  }

  @ApiOperation({
    summary: "Find review by id function",
    description: "This is the main Description for finding reivew by id on this system!"
  })
  @Get(':id')
  async findOne(@Param('id') id: string) : Promise<ReviewEntity> {
    return await this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return await this.reviewsService.update(+id, updateReviewDto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: "Delete review function",
    description: "This is the main Description for deleting reivew on this system!"
  })
  @UseGuards(AuthenticationGuard, AuthorizeGuardFunc([Roles.ADMIN]))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.reviewsService.remove(+id);
  }
}
