import { AuthDto } from './dto/auth.dto';
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2'

@Injectable({

})
export class AuthService {
    constructor(private prisma: PrismaService) {
        
    }

    async signup(dto: AuthDto) {
        //generate the password hash
        const hash = await argon.hash(dto.password);
        

        //save the new user in db
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash: hash,
            },

            /**
             * Select specific fields on table
             */
            // select: {
            //     id: true,
            //     email: true,
            //     createdAt: true,
            //     updatedAt: true
            // }
        })

        /**
             * Delete the specific fields of object
             */
        delete user.hash

        //return the saved user
        return user;
    }

    signin() {
        return {
            msg: "I am sign in func controller",
            status: 200
        }
    }
}