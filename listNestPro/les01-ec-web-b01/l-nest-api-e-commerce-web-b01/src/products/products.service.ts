import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { OrderStatus } from 'src/orders/enums/order-status.enum';

@Injectable()
export class ProductsService {
  /**
   *
   */
  constructor(@InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoriesService
  ) {
    
  }

  async create(createProductDto: CreateProductDto, currentUser: UserEntity) : Promise<ProductEntity> {
    
    const category = await this.categoryService.findOne(+createProductDto.categoryId);
    // const p = Object.assign(createProductDto, ProductEntity);
    const product = this.productRepository.create(createProductDto);
    product.category = category;
    product.addedBy = currentUser;
    return await this.productRepository.save(product);
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find({
      relations: {
        category: true,
        addedBy: true
      },
      select: {
        category: {
          id: true,
          title: true,
          description: true
        },
        addedBy: {
          id: true,
          name: true,
          email: true
        }
      }
    });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: {
        id: id
      },
      relations: {
        category: true,
        addedBy: true,
      },
      select: {
        category:{
          id: true,
          title: true,
          description: true
        },
        addedBy: {
          id: true,
          email: true,
          name: true,
        }
      }
    });

    if (!product) {
      throw new NotFoundException(`Product is not existed!`);
    }

    return product;
  }

  async update(id: number, updateProductDto: Partial<UpdateProductDto>, currenUser: UserEntity) : Promise<ProductEntity> {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product is not existed!`);
    }
    Object.assign(product, updateProductDto);

    product.addedBy = currenUser;

    if (updateProductDto.categoryId) {
      const category = await this.categoryService.findOne(
        +updateProductDto.categoryId
      );

      product.category = category;
    }
    

    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return await this.productRepository.remove(product);
  }

  async updateStock(id: number, stock: number, status: string) {
    let product = await this.findOne(id);
    if (status === OrderStatus.CANCELLED) {
      product.stock -= stock;
    } else {
      product.stock += stock;
    }
    product = await this.productRepository.save(product);

    return product;
  }
}
