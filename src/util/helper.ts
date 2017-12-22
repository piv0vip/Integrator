import * as moment from 'moment';
import cronParse from 'cron-parser';
import _ from 'lodash';

export function createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
}

export function formatDate(val: string): string {
    return val ? moment.parseZone(val).local().format('MM/DD/YY H:mm') : '';
}

export function firstCharToLower(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
}

export function firstCharToUpper (str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isCronString(cronstring: string): boolean {
    try {
        let parserCronString = cronParse.parseString(cronstring);
        if (_.isEmpty(parserCronString.errors)) {
            return true;
        }
        throw 'Invalid Cron string!';
    }
    catch (ex) {
        return false;
    }
}