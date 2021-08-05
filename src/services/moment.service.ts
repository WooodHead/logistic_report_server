import * as moment from 'moment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MomentService {
    dateTimeFormat(dateTime, dateFormat = 'MM/DD/YYYY') {
        return moment(new Date(dateTime)).format(dateFormat);
    }
}
