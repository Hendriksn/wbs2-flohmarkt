import {forwardRef, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DataSource} from "typeorm";
import {AuthController} from './controller/auth.controller';
import {PassportModule} from "@nestjs/passport";
import {SessionSerializer} from "./utils/SessionSerializer";
import {UsersModule} from './users/users.module';
import {UserEntity} from "./users/entities/user.entity";
import { JwtGuard } from 'src/guards/jwt.guard';
import {UsersController} from "./users/users.controller";
import {AppService} from "./app.service";
import {UsersService} from "./users/users.service";
import {ArticlesModule} from './articles/articles.module';
import {Article} from "./articles/entities/article.entity";
import {Favorites} from "./favorites/entity/favorites.entity";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {AuthService} from "./auth/services/auth/auth.service";
import { LocalStrategy } from './utils/LocalStrategy';
import {FavoritesModule} from "./favorites/favorites.module";
import {FavoritesController} from "./favorites/favorites.controller";

import * as path from "path";
import { ServeStaticModule } from "@nestjs/serve-static";
import { UploadController } from './upload/upload.controller';
import {MulterModule} from "@nestjs/platform-express";
import { MessageModule } from './message/message.module';
import {Message} from "./message/entities/message.entity";
import { ChatModule } from './chat/chat.module';
import {Chat} from "./chat/entities/chat.entity";



@Module({
    imports: [ PassportModule.register({session: true}),forwardRef(() => UsersModule), ArticlesModule, FavoritesModule,
        //SqLite:
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: '../database/tmp.sqlite',
            entities: [UserEntity, Article, Favorites, Message, Chat],
            synchronize: true,
        }),
        JwtModule.register({
            secret:'super-secret-cat'
        }),
        MulterModule.register({
            dest: './assets/pb/',
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve('../frontend/dist/frontend'),
        }),
        MessageModule,
        ChatModule,

        //localhost_MariaDB (PhpMyAdmin):
        //TypeOrmModule.forRoot({type: 'mariadb', host: "localhost", username: "root", password: "", database: "flohmarkt", entities: [User, Article], synchronize: true,}),
    ],
    controllers: [AppController, AuthController, UsersController, FavoritesController, UploadController],
    providers: [AppService, SessionSerializer,JwtGuard,JwtService, LocalStrategy, SessionSerializer, {
        provide: "USERS_SERVICE",
        useClass: UsersService,
    },
        {
            provide: 'AUTH_SERVICE',
            useClass: AuthService,
        },
        {
            provide: "APP_SERVICE",
            useClass: AppService,
        },],

})
export class AppModule {}

