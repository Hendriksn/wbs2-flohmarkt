import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import * as session from 'express-session';
import * as passport from "passport";
import "reflect-metadata";
import {TimeLoggerInterceptor} from "./time-logger/time-logger.interceptor";
import {Server} from "socket.io";
import {UserEntity} from "./users/entities/user.entity";


async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(
        session({
            secret: 'my-secret',
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 60000000,
            },
        }),
    );

    app.use(passport.initialize());
    app.use(passport.session())
    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({transform: true, enableDebugMessages: true}),
    );
    app.useGlobalInterceptors(new TimeLoggerInterceptor());

    passport.serializeUser((user: UserEntity, done) => {
        done(null, user.id);
    });

    await app.listen(3000);

    console.log('-------------------------------------------------------------');
    console.log('                 Flohmarkt-Backend läuft                     ');
    console.log('-------------------------------------------------------------');
    console.log('-------------------------------------------------------------');
    console.log('          Frontend aufrufen: http://localhost:3000/     ');
    console.log('-------------------------------------------------------------');
    console.log('    Zugangsdaten Verkäufer:                                  ');
    console.log('    Username: kevin                                          ');
    console.log('    Passwort: 123456789                                      ');
    console.log('-------------------------------------------------------------');

    console.log('    Zugangsdaten Käufer:                                     ');
    console.log('    Username: samuel                                         ');
    console.log('    Passwort: 123456789                                      ');
    console.log('-------------------------------------------------------------');


    const io = new Server(3001, { /* options */});
    console.log("Socket gestartet")
    io.on("connection", (socket) => {
        console.log("Client verbindet")
        socket.on("message", () => {
            socket.broadcast.emit("reload", "reload");
        });
    });


}

bootstrap();