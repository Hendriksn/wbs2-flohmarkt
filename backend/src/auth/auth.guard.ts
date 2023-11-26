import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import {ISession} from "../model/ISession";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
  const http = context.switchToHttp();
  const request = http.getRequest<Request>();
  const session = request.session as unknown as ISession;
  return session.isLoggedIn == true;
}
}
