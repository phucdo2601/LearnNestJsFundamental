import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
/**
 * GET /me
 */
    @UseGuards(JwtGuard)
    @Get(`me`)
    getMe(
        @GetUser() user: User,
        @GetUser('email') email: string
    ) {
        console.log({
            email: email,
            user: user,
        });
        
        return user;
    }

    
    @Patch()
    editUser() {

    }
}
