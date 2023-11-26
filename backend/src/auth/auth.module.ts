import { Module } from '@nestjs/common';
import {AppService} from "../app.service";
import { AuthService } from './services/auth/auth.service';
import {UsersService} from "../users/users.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../users/entities/user.entity";
import {UsersController} from "../users/users.controller";
import {AppController} from "../app.controller";
import {LocalStrategy} from "../utils/LocalStrategy";
import {SessionSerializer} from "../utils/SessionSerializer";
import { AuthController } from './controllers/auth/auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";


@Module({
  imports: [PassportModule,TypeOrmModule.forFeature([UserEntity]),JwtModule.register({
    secret:'super-secret-cat'
  })],
  controllers:[AuthController, UsersController, AppController],
  providers: [ AppService, UsersService, LocalStrategy, SessionSerializer

]
})
export class AuthModule {}
