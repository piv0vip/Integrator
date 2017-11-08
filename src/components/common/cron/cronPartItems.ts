export class PartItem {

    key: string;
    value: string;
    disabled: boolean;

    constructor(key: string, value: string, disabled: boolean) {
        this.key = key;
        this.value = value;
        this.disabled = disabled;
    }

    get Key() { return this.key; }
    get Value() { return this.value; }
    get Disabled() { return this.disabled; }

    get VisibleKey() { return this.Key; }
    set VisibleKey(value) { }

    isMyKey(key: string): boolean { return this.key === key; }
}

export class AddonPartItem extends PartItem {
    constructor(key: string, value: string) {
        super(key, value, false);
    }
}

export class EveryPartItem extends PartItem {
    constructor(value: string) {
        super('*', value, false);
    }
}

export class CustomPartItem extends PartItem {

    expression: RegExp[];
    inputValue: string;

    constructor(expression: RegExp[], value: string) {
        super('99999', value, true);
        this.expression = expression || [];
        this.inputValue = this.Key;
    }

    get VisibleKey() { return this.inputValue; }

    set VisibleKey(value) {
        if (this.isMyKey(value)) {
            this.inputValue = value;
        };
    }

    isMyKey(key: string): boolean {
        for (let i = 0; i < this.expression.length; i++) {
            if (this.expression[i].test(key)) {
                return true;
            }
        }
        return false;
    }
}