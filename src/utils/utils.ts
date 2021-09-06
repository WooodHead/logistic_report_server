import { groupBy as _groupBy, maxBy as _maxBy } from 'lodash';
import * as moment from 'moment';

export const randomFromOneTo = (max) => Math.floor(Math.random() * max) + 1;

// between min (included) and max (included)
export const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export function maxFrequencyInArray(array) {
    const groupByIds = _groupBy(array);
    return _maxBy(Object.keys(groupByIds), (key) => groupByIds[key].length);
}

export function extractFromToday(number, units) {
    return moment().subtract(number, units);
}
