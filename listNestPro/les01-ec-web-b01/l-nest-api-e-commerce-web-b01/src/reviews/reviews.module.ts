import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';

@Module({
  imports: [
    /**
     * import ReviewEntity for using this entity on this resource
     */
    TypeOrmModule.forFeature([
      ReviewEntity
    ])
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
