import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSignUpDto } from './dto/user-signup.dto';
import {hash} from 'bcrypt';

@Injectable()
export class UsersService {
  /**
   * With that in place, we can inject the UsersRepository into the UsersService using the @InjectRepository() decorator:
   */
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {
    
  }

  async signup(userSignUpDto: UserSignUpDto) : Promise<UserEntity> {
    const userExists = await this.findUserByEmail(userSignUpDto.email);

    if (userExists) {
      throw new BadRequestException(`Username with email ${(await userExists).email} is existed!`);
    }

    userSignUpDto.password = await hash(userSignUpDto.password, 10);

    let user = this.userRepository.create(userSignUpDto);
    user = await this.userRepository.save(user)
    
    delete user.password;

    return user;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOneBy({
      email: email,
    });
  }
}
