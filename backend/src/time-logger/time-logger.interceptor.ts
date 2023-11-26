import { CallHandler, ExecutionContext, Injectable, NestInterceptor,} from '@nestjs/common';
import { Observable } from 'rxjs'; import { tap } from 'rxjs/operators'; import { Request } from 'express';

@Injectable()
export class TimeLoggerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const httpRequest = context.switchToHttp();
        const request = httpRequest.getRequest<Request>();
        const url = request.originalUrl;
        console.log(`Start ${url}`);
        const now = Date.now(); return next.handle().pipe(
            tap(() => {
                console.log(`End ${url} ${Date.now() - now}ms`);
            }), );
    } }