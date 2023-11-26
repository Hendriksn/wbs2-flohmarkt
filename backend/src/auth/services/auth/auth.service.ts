import {Inject, Injectable} from '@nestjs/common';
import {AppService} from "../../../app.service";
import * as bcrypt from "bcrypt";
import {UserEntity} from "../../../users/entities/user.entity";
import {JwtService} from "@nestjs/jwt";
import {isStrongPassword} from "class-validator";

@Injectable()
export class AuthService {

    constructor(@Inject("APP_SERVICE") private readonly AppService: AppService, private jwtService: JwtService) {
    }

    async validateUser(username: string, password: string): Promise<UserEntity> {
        const foundUser = await this.AppService.findUser(username)
        if(foundUser){
              return this.ValidatePasswort(password, foundUser.password).then(
                IsValidPassword =>{
                    if (IsValidPassword) {

                        return foundUser
                    }
                }
            )
        }
        console.log("User Valdation failed!")
        return null
    }

    ValidatePasswort(password: string, hashedpassword: string) {
        return bcrypt.compare(password, hashedpassword).then(
            isValidPassword => {
                return isValidPassword
            })
    }
}


