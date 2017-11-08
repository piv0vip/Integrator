import {
    PartItem,
    AddonPartItem,
    EveryPartItem,
    CustomPartItem
} from './cronPartItems';

export abstract class CronPart {

    values: PartItem[] = [];
    everyPartItem: PartItem;
    customPartItem: PartItem;
    currentValue: PartItem;

    constructor(value = '*') {

        this.everyPartItem = new EveryPartItem(this.EveryValue);
        this.customPartItem = new CustomPartItem(this.CustomExpression, this.CustomValue);
        
        this.currentValue = this.everyPartItem;
        
        this.init();
    }

    load(arr: {key: string, value: string}[]) {
        
        this.values.push(this.everyPartItem);
        
        arr.forEach((item) => {
            if (item.key && item.value)
                this.values.push(new AddonPartItem(item.key, item.value));
        });
        
        this.values.push(this.customPartItem);
    }

    get SelectList(): {value: string, text: string, disabled: boolean}[] {

        return this.values.map(function (value) {
            return {
                value: value.key,
                text: value.value,
                disabled: value.disabled
            };
        });
    }

    get SelectValue(): string { return this.currentValue.Key; }

    set SelectValue(value: string) {
        let currentValue = this.getPartItemFromValue(value);
        if (!(currentValue instanceof CustomPartItem)) { this.InputValue = value; }
    }

    get InputValue() { return this.currentValue.VisibleKey; }
    set InputValue(value) {
        for (let i = 0; i < this.values.length; i++) {
            if (this.values[i].isMyKey(value)) {
                this.currentValue = this.values[i];
                this.currentValue.VisibleKey = value;
                return;
            }
        }
        this.currentValue = this.everyPartItem;
    }

    getPartItemFromValue(value: string): PartItem {
        for (let i = 0; i < this.values.length; i++) {
            if (this.values[i].isMyKey(value)) {
                return this.values[i];
            }
        }
        return this.everyPartItem;
    }

    get CustomExpression(): RegExp[] {
        return [/[0-9]/];
    }

    get CustomValue(): string { return 'Custom Value'; }

    abstract init()

    abstract get EveryValue(): string;

}

export class Minute extends CronPart {
    init() {
        this.load([
            { key: '*/5', value: 'Every 5 Minute' },
            { key: '*/10', value: 'Every 10 Minute' },
        ]);
    }

    get EveryValue(): string { return 'Every Minute'; }
}

export class Hour extends CronPart {
    init() {
        this.load([
            { key: '*/5', value: 'Every 5 Hours' },
            { key: '*/10', value: 'Every 10 Hours' },
        ]);
    }

    get EveryValue(): string { return 'Every Hour'; }
}

export class Day extends CronPart {
    init() {
        this.load([
            { key: '*/5', value: 'Every 5 Days' },
            { key: '*/10', value: 'Every 10 Days' },
        ]);
    }

    get EveryValue(): string { return 'Every Day'; }
}

export class Month extends CronPart {
    init() {
        this.load([
            { key: '*/2', value: 'Every 2 Months' },
            { key: '*/4', value: 'Every 4 Months' },
        ]);
    }

    get EveryValue(): string { return 'Every Month'; }
}

export class DayOfWeek extends CronPart {
    init() {
        this.load([
            { key: '0', value: 'Every Sunday' },
            { key: '1', value: 'Every Monday' },
            { key: '2', value: 'Every Tuesday' },
            { key: '3', value: 'Every Wednesday' },
            { key: '4', value: 'Every Thursday' },
            { key: '5', value: 'Every Friday' },
            { key: '6', value: 'Every Saturday' },
        ]);
    }

    get EveryValue(): string { return 'Every Days Of Week'; }
}
