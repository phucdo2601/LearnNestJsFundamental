import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";
import { jwtSecret } from "./auth.module";


/**
 * Implement JWT authentication strategy
 * 
 *  In Passport, a strategy is responsible for authenticating requests, which it accomplishes by implementing 
 * an authentication mechanism. In this section, you will implement a JWT authentication strategy that will be used to authenticate users.
 * 
 * You will not be using the passport package directly, but rather interact with the wrapper package 
 * @nestjs/passport, which will call the passport package under the hood. 
 * To configure a strategy with @nestjs/passport, you need to create a class that extends the 
 * PassportStrategy class. You will need to do two main things in this class:

You will pass JWT strategy specific options and configuration to the super() method in the constructor.
A validate() callback method that will interact with your database to fetch a user based on 
the JWT payload. If a user is found, the validate() method is expected to return the user object.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt"){

    /**
     *
     */
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret,
        });
        
    }

    async validate(payload :{
        userId: number
    }) {
        const user = await this.usersService.findOne(payload.userId);

        if (!user) {
          throw new UnauthorizedException();
        }
    
        return user;
    }
} 