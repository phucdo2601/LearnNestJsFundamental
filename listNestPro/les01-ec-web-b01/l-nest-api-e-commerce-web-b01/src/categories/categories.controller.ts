import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CurrentUserDecorator } from 'src/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { Roles } from 'src/utility/common/user-roles.enum';
import { AuthorizeGuardFunc } from 'src/utility/guards/authorization.guard';
import { CategoryEntity } from './entities/category.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({
    summary: "Create category function",
    description: "This is the main Description for creating new catagory on this system!"
  })
  @UseGuards(AuthenticationGuard, AuthorizeGuardFunc([Roles.ADMIN]))
  @ApiBearerAuth()
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @CurrentUserDecorator() currentUser: UserEntity) : Promise<CategoryEntity> {
    return await this.categoriesService.create(createCategoryDto, currentUser);
  }

  @ApiOperation({
    summary: "List all categories function",
    description: "This is the main Description for fetching list categories on this system!"
  })
  @Get()
  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoriesService.findAll();
  }

  @ApiOperation({
    summary: "Get category by id function",
    description: "This is the main Description for getting category by id on this system!"
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CategoryEntity> {
    return await this.categoriesService.findOne(+id);
  }

  @ApiOperation({
    summary: "Update category function",
    description: "This is the main Description for updating category on this system!"
  })
  @UseGuards(AuthenticationGuard, AuthorizeGuardFunc([Roles.ADMIN]))
  @ApiBearerAuth()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
    return await this.categoriesService.update(+id, updateCategoryDto);
  }

  @ApiOperation({
    summary: "Deleting category function",
    description: "This is the main Description for deleting category on this system!"
  })
  @UseGuards(AuthenticationGuard, AuthorizeGuardFunc([Roles.ADMIN]))
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.categoriesService.remove(+id);
  }
}
