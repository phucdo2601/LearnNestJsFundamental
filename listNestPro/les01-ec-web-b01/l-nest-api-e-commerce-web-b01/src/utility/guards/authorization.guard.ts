import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, mixin } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

/**
 * AuthorizeGuard for verify role of user has logged in this system
 * with the excatly role can access something
 */
@Injectable()
export class AuthorizeGuard implements CanActivate {

    /**
     *
     */
    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const allowedRoles = this.reflector.get<string[]>('allowedRoles', context.getHandler());
        const request = context.switchToHttp().getRequest();
        const result = request?.currentUser?.roles.map((role: string) => allowedRoles.includes(role)).find((val: boolean) => val === true);
        if (result) {
            return true;
        }
        throw new UnauthorizedException(`Sorry, your are not authorized.`);
    }
    
}

export const AuthorizeGuardFunc = (allowedRoles: string[]) => {
    class RolesGuardMixin implements CanActivate {
        canActivate(context: ExecutionContext): boolean {
            const request = context.switchToHttp().getRequest();
        const result = request?.currentUser?.roles.map((role: string) => allowedRoles.includes(role)).find((val: boolean) => val === true);
        if (result) {
            return true;
        }
        throw new UnauthorizedException(`Sorry, your are not authorized.`);
        }
    }
    const guard = mixin(RolesGuardMixin);
    return guard;
}

