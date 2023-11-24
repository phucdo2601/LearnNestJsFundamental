import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UserController {
/**
 * GET /me
 */
    @Get(`me`)
    getMe() {
        return 'user info';
    }
}
