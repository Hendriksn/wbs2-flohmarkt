import {
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    Req,
    Res,
    Session,
    UnauthorizedException,
    UseGuards,
    Headers
} from '@nestjs/common';
import {MessageResultDto} from '../Dto/MessageResultDto';
import {LocalAuthGuard} from "../utils/LocalAuthGuard";
import {AppService} from "../app.service";
import {UserEntity} from "../users/entities/user.entity";
import {Role} from "../model/role.enum";


@Controller('auth')
export class AuthController {

    constructor(private service: AppService) {
    }

    @Post("register")
    register(@Body("username") username: string,
             @Body("givenName") givenName: string,
             @Body("familyName") familyName: string,
             @Body("telefonnummer") telefonnummer: string,
             @Body("email") email: string,
             @Body("role") role: Role,
             @Body("picture") picture: string,
             @Body("password") password: string): MessageResultDto {
        const user: UserEntity = {
            username, givenName, familyName, telefonnummer, email, role, picture, password
        }

        let User = this.service.postUser(user)
        return new MessageResultDto(User + "wurde hinzugefügt")
    }

    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(@Session() session: Record<string, any>): Promise<{ id, user }> {
        return {id: session.id, user: session.passport.user.id}
    }

    @Post("checklogin")
    async checklogin(
        @Body("jwt") jwt: string,
        @Session() session: Record<string, any>
    ): Promise<{ id, user?: number }> {
        console.log(session.id)
        if (session.id === jwt) {
            return {id: session.id, user: session.passport.user.id}
        } else {
            throw new UnauthorizedException()
        }
    }

}
