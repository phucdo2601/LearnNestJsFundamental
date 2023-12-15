import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserSignInDto } from './dto/user-signin.dto';
import { CurrentUserDecorator } from 'src/utility/decorators/current-user.decorator';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeRoles } from 'src/utility/decorators/authorize.roles.decorator';
import { Roles } from 'src/utility/common/user-roles.enum';
import { AuthorizeGuard, AuthorizeGuardFunc } from 'src/utility/guards/authorization.guard';

@ApiTags("users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: "Login function",
    description: "This is the main Description for logging on this system!"
  })
  @Post('signup')
  async signup(@Body() userSignUpDto: UserSignUpDto) : Promise<{
    user: UserEntity
  }> {
    return {
      user: await this.usersService.signup(userSignUpDto)
    };
  }

  @ApiOperation({
    summary: "Sign up function",
    description: "This is the main Description for registering account on this system!"
  })
  @Post('signin')
  async signin(@Body() userSignInDto: UserSignInDto): Promise<{
    accessToken: string,
    user: UserEntity
  }> {
    const user = await this.usersService.signin(userSignInDto);
    const accessToken = await this.usersService.accessToken(user);

    return {
      accessToken: accessToken,
      user: user
    }
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto)  {
    // return this.usersService.create(createUserDto);
    return "Hello USER Controller!";
  }

  // @AuthorizeRoles(Roles.ADMIN)
  // @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @ApiOperation({
    summary: "Get all list user function",
    description: "This is the main Description for fetching list users on this system!"
  })
  @UseGuards(AuthenticationGuard, AuthorizeGuardFunc([Roles.ADMIN]))
  @ApiBearerAuth()
  @Get('all')
  async findAll() : Promise<UserEntity[]>{
    return await this.usersService.findAll();
  }

  @ApiOperation({
    summary: "Geting list user function",
    description: "This is the main Description for getting user by id on this system!"
  })
  @Get('single/:id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findOne(+id);
  }

  @ApiOperation({
    summary: "Update user function",
    description: "This is the main Description for updating user on this system!"
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({
    summary: "Delete user function",
    description: "This is the main Description for deleting user on this system!"
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @ApiOperation({
    summary: "Get current user login function",
    description: "This is the main Description for get current user login on this system!"
  })
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Get('me')
  getProfile(@CurrentUserDecorator() currentUser: UserEntity) {
    return currentUser;
  }
}
