import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class ReviewsService {
  /**
   *
   */
  constructor(@InjectRepository(ReviewEntity) private reviewEntity: Repository<ReviewEntity>) {
  }

  async create(createReviewDto: CreateReviewDto, currentUser: UserEntity) {
    

    return await 'This action adds a new review';
  }

  findAll() {
    return `This action returns all reviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
