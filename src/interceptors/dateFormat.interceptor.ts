import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MomentService } from '../services/moment.service';

@Injectable()
export class DateFormatInterceptor implements NestInterceptor {
    constructor(private readonly momentService: MomentService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((value) => {
                return Array.isArray(value)
                    ? value.map((item) => this.changeObjectDate(item))
                    : this.changeObjectDate(value);
            })
        );
    }

    private changeObjectDate(object) {
        object.date = this.momentService.dateTimeFormat(object.date);
        return object;
    }
}
