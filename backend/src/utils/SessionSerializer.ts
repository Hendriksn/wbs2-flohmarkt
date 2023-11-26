import {PassportSerializer} from "@nestjs/passport";
import {Inject} from "@nestjs/common";
import {UserEntity} from "../users/entities/user.entity";
import {AppService} from "../app.service";

export class SessionSerializer extends PassportSerializer{

    constructor(@Inject(AppService) private readonly AppService: AppService,)
{
        super();
    }

    serializeUser(user: UserEntity, done: (err, user: UserEntity) => void) {
        done(null, user);
    }


    async deserializeUser(user: UserEntity, done: (err, user: UserEntity) => void) {
        const userDB = await this.AppService.findUser(user.username);
        return userDB ? done(null, userDB) : done(null, null);
    }
}
