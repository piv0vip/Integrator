import { CronPart, Minute, Hour, Day, Month, DayOfWeek } from './cronParts';
import { IServerable, IEditViewElement } from '../../../interfaces';
import cronstrue from 'cronstrue';
import { Type } from '../../../api/models';

export class CronSchedule implements IServerable<string>, IEditViewElement  {

    minute: CronPart;
    hour: CronPart;
    day: CronPart;
    month: CronPart;
    dayOfWeek: CronPart;

    constructor() {
        this.minute = new Minute();
        this.hour = new Hour();
        this.day = new Day();
        this.month = new Month();
        this.dayOfWeek = new DayOfWeek();
    }

    toString(): string {
        return `${this.Minute} ${this.Hour} ${this.Day} ${this.Month} ${this.DayOfWeek}`;
    }

    toHuman(): string {
        return cronstrue.toString(this.toString());
    }

    get Minute(): string { return this.minute.InputValue; }
    get Hour(): string { return this.hour.InputValue; } 
    get Day(): string { return this.day.InputValue; }
    get Month(): string { return this.month.InputValue; }
    get DayOfWeek(): string { return this.dayOfWeek.InputValue; }

    _parse(str: string) {
        let arr: string[] = str.split(' ');
        arr[0] && (this.minute.InputValue = arr[0]);
        arr[1] && (this.hour.InputValue = arr[1]);
        arr[2] && (this.day.InputValue = arr[2]);
        arr[3] && (this.month.InputValue = arr[3]);
        arr[4] && (this.dayOfWeek.InputValue = arr[4]);
    }

    toServer(): string {
        return this.toString();
    }

    load(arg: string) {
        this._parse(arg || '');
    }

    setValue(value: string) {
        this._parse(value);
    }
    
    getValue(): string {
        return this.toString();
    }

    getType(): Type {
        return Type.String;
    }
}