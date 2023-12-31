import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userTypes } from 'src/shared/schema/user.schema';
import config from 'config'
import { UserRepository } from 'src/shared/repositories/user.repository';
import { comparePassword, generateHashPassword } from 'src/shared/utility/password-manager';
import { sendEmail } from 'src/shared/utility/mail-handler';
import { generateAuthToken } from 'src/shared/utility/token-generator';

@Injectable()
export class UsersService {
  /**
   *
   */
  constructor(@Inject(UserRepository) private readonly usersModel: UserRepository) {

    
  }

  async create(createUserDto: CreateUserDto) {
    try {
      // generate the hash password
      createUserDto.password = await generateHashPassword(createUserDto.password);

      /**
       * check if it for admin
       */
      if (createUserDto.type === userTypes.ADMIN && createUserDto.secretToken === config.get('adminSecretToken')) {
        throw new Error(`Not allowed to create admin`);
      } else {
        createUserDto.isVerified = true;
      }
      
      //  user is already existing
      const user = await this.usersModel.findOne({
        email: createUserDto.email,
      })

      if (user) {
        throw new Error(`User already exists`);
      }

      // generate the otp
      const otp = Math.floor(Math.random() * 900000) + 100000;

      const otpExpiryTime = new Date();
      otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 10);

      const newUser = await this.usersModel.create({
        ...createUserDto,
        otp,
        otpExpiryTime
      });

      if (newUser.type !== userTypes.ADMIN) {
        sendEmail(
          newUser.email,
          config.get('emailService.emailTemplates.verifyEmail'),
          "Email verification - PDN",
          {
            customerName: newUser.name,
            customerEmail: newUser.email,
            otp
          }
        );
      }

      return {
        success: true,
        message: newUser.type === userTypes.ADMIN
        ? 'Admin created successfully'
        : 'Please activate your account by verifying your email. We have sent you a wmail with the otp',
        result: {
          email: newUser.email,

        }
      }

    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const userExist = await this.usersModel.findOne({
        email,
      });

      if (!userExist) {
        throw new Error('Please verify your email');
      }

      const isPasswordMatch = await comparePassword(password, userExist.password);

      if (!isPasswordMatch) {
        throw new Error('Please verify your password or email');
      }

      const token = await generateAuthToken(userExist._id);

      return {
        success: true,
        message: "Login successful",
        result: {
          user: {
            name: userExist.name,
            email: userExist.email,
            type: userExist.type,
            id: userExist._id.toString(),
          },

          token,
        }
      }
    } catch (error) {
      throw error;
    }


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
}
