import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "express";

@Controller('auth')
export class AuthController {
    // two ways for desclaring controller with object service

    //way 2: same java
    // authService: AuthService;
    // constructor(authService: AuthService) {
    //     this.authService = authService
    // }

    // way 1: shorthand
    constructor(private authService: AuthService) {
        //call func service in constructor
        // this.authService.test();
    }

    // POST: auth/signup
    @Post('signup')
    signup(@Body() dto: any) {
        console.log({
            dto,
        });
        
        return this.authService.signup()
    }

    // POST: auth/signin
    @Post('signin')
    signin() {
        return this.authService.signin()
    }
}