import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ReviewsService {
  /**
   *
   */
  constructor(@InjectRepository(ReviewEntity) private reviewRepository: Repository<ReviewEntity>, 
    private readonly productService: ProductsService
  ) {
  }

  async create(createReviewDto: CreateReviewDto, currentUser: UserEntity) {
    const product = await this.productService.findOne(createReviewDto.producId);
    let review = await this.findOnByUserAndProduct(currentUser.id, createReviewDto.producId);

    if (!review) {
      review = this.reviewRepository.create(createReviewDto);
      review.user = currentUser;
      review.product = product;
    } else {
      review.comment = createReviewDto.comment;
      review.ratings = createReviewDto.ratings;
    }

    return await this.reviewRepository.save(review);
  }

  async findAll() {
    return await this.reviewRepository.find({
      relations: {
        user: true,
        product: {
          category: true
        }
      }
    });
  }

  async findAllByProduct(id: number) :Promise<ReviewEntity[]> {
    const product = await this.productService.findOne(id);

    return await this.reviewRepository.find({
      where: {
        product: {
          id: product.id
        },
      },
      relations: {
        user: true,
        product: {
          category: true,
        }
      }
    });
  }

  async findOne(id: number):Promise<ReviewEntity> {
    const review = await this.reviewRepository.findOne({
      where: { id: id },
      relations: {
        user: true,
        product: {
          category: true,
        }
      }
    });

    if (!review) {
      throw new NotFoundException(`Review with id: ${id} not found`);
    }
    return review;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  async remove(id: number) {
    const review = await this.findOne(id);
    return await this.reviewRepository.remove(review);
  }

  async findOnByUserAndProduct(userId: number, productId: number) {
    return await this.reviewRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        product: {
          id: productId
        }
      },
      relations: {
        user: true,
        product: {
          category: true
        }
      }
    })
  }
}
