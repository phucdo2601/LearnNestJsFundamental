import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeGuardFunc } from 'src/utility/guards/authorization.guard';
import { Roles } from 'src/utility/common/user-roles.enum';
import { CurrentUserDecorator } from 'src/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductEntity } from './entities/product.entity';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthenticationGuard, AuthorizeGuardFunc([Roles.ADMIN]))
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Create a new product!",
    description: "This is the main Description for creating a new product"
  })
  @Post()
  async create(@Body() createProductDto: CreateProductDto, @CurrentUserDecorator() currentUser: UserEntity) : Promise<ProductEntity> {
    return await this.productsService.create(createProductDto, currentUser);
  }

  @Get()
  @ApiOperation({
    summary: "Get a list of products!",
    description: "This is the main Description for fetching a list of products"
  })
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: "Get a product by id!",
    description: "This is the main Description for getting a product by id"
  })
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthenticationGuard, AuthorizeGuardFunc([Roles.ADMIN]))
  @ApiOperation({
    summary: "Get a product by id!",
    description: "This is the main Description for getting a product by id"
  })
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @CurrentUserDecorator() userEntity: UserEntity) : Promise<ProductEntity> {
    return await this.productsService.update(+id, updateProductDto, userEntity);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productsService.remove(+id);
  }
}
