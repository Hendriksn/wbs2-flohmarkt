import {Strategy} from "passport-local";
import {PassportStrategy} from "@nestjs/passport";
import {Inject, Injectable, Session, UnauthorizedException} from "@nestjs/common";
import {AuthService} from "../auth/services/auth/auth.service";
import {ISession} from "../model/ISession";
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(@Inject("AUTH_SERVICE") private readonly authService: AuthService) {
        super();
    }

    async validate(username: string, password: string, @Session() session: ISession){
        const user = await this.authService.validateUser(username, password)
        if(!user){
            throw new UnauthorizedException();
        }
        return user
    }
}