import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({})
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt'
    ){
    /**
     * 
     * @param config 
     * @param prisma 
     * 
     * When they declare private before param in constructor:
     *   - You won't set anything on this cons
     *   - You will be use this param outside of the constructor 
     * When they do not declare private before param in constructor:
     *   - You will set anything on this cons
     *   - You won't use this param outside of the constructor
     */
    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest:
            ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        })
    }

    async validate(payload: {
        sub: number,
        email: string,
    }) {
        // console.log({
        //     payload,
        // });

        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub
            }
        });

        delete user.hash;

        return user;
    }
}