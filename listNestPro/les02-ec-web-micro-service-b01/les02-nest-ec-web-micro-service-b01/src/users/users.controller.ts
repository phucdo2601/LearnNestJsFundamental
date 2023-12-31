import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import {Response} from 'express'
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post(`/login`)
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUser: LoginUserDto, 
    @Res({
      passthrough: true
    }) response: Response
  ) {
    const loginRes = await this.usersService.login(loginUser.email, loginUser.password);
  
    if (loginRes.success) {
      response.cookie('_pdn_auth_token', loginRes.result?.token, {
        httpOnly: true
      })
    }

    delete loginRes.result?.token;
    return loginRes;
  }
 
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
