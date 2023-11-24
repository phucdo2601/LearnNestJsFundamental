import { AuthDto } from './dto/auth.dto';
import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable({

})
export class AuthService {
    constructor(private prisma: PrismaService) {

    }

    async signup(dto: AuthDto) {
        //generate the password hash
        const hash = await argon.hash(dto.password);

        try {
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
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ForbiddenException('Credentials token');
                }
            }
            throw error;
        }

    }

    async signin(dto: AuthDto) {
        //find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,

            }
        })

        // if user does not exist throw exception
        if (!user) {
            throw new ForbiddenException(
                "Credentials incorrect",
            );


        }

        // compare password
        const pwMatched = await argon.verify(user.hash, dto.password);

        // if password incorrect  throw exception
        if (!pwMatched) {
            throw new ForbiddenException(
                'Credentials incorrect',
            )
        }

        // send back the user

        return {
            msg: "I am sign in func controller",
            status: 200
        }
    }
}