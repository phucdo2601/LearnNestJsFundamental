import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({

})
export class AuthService {
    constructor(private prisma: PrismaService) {
        
    }

    signup() {
        return {
            msg: "I am sign up func controller",
            status: 200
        }
    }

    signin() {
        return {
            msg: "I am sign in func controller",
            status: 200
        }
    }
}