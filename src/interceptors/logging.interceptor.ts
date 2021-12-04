import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger('RequestLogInterceptor');

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request: Request = context.getArgByIndex(0);
        const { url, method, body } = request;
        this.logger.log(`Request: ${JSON.stringify({ url, method, body })}`);
        const now = Date.now();
        return next.handle().pipe(
            tap(() =>
                this.logger.log(
                    `Request end on ${Date.now() - now}ms: ${JSON.stringify({
                        url,
                        method,
                        body,
                    })}`
                )
            )
        );
    }
}
