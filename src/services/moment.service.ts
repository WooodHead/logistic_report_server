import * as moment from 'moment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MomentService {
    dateTimeFormat(dateTime, dateFormat = 'MM/DD/YYYY') {
        return moment(new Date(dateTime)).format(dateFormat);
    }

    dateDiffInDays(date) {
        const now = moment(new Date());
        const duration = moment.duration(moment(now).diff(date));
        return Math.floor(duration.asDays());
    }

    weekDayByDate(date) {
        return this.dateTimeFormat(date, 'dddd');
    }

    extractFromToday(number, units) {
        return moment().subtract(number, units).format('YYYY-MM-DD');
    }

    addToToday(number, units) {
        return moment().subtract(number, units).format('YYYY-MM-DD');
    }
}
