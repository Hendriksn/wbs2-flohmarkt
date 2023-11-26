import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {ISession} from "../model/ISession";
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean{
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    console.log("Inauthguard")
    // const session = request.session as ISession
    //
    // return session.isLoggedIn == true;
    return
  }
}
