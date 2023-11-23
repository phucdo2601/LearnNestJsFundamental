import { Injectable } from "@nestjs/common";

@Injectable({

})
export class AuthService {
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