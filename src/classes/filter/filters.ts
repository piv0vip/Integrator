import { Dictionary } from 'typescript-collections';
import { FilterTypeEnum, EntityStatusEnum } from '../../enums';
import { EnumValues } from 'enum-values';


export interface IServerable {
    toServer(): any;
} 

export interface IResetable {
    reset(): void;
}

export interface IFilter extends IServerable, IResetable {
    readonly Type: FilterTypeEnum;
}

export abstract class Filter implements IFilter {

    protected _type: FilterTypeEnum;

    constructor() {
        this.setType();
        this.reset();
    }

    get Type(): FilterTypeEnum { return this._type; }

    abstract setType();
    abstract toServer();
    abstract reset(): void

    static getFilter(filterType: FilterTypeEnum) {

    }
}

export class ContainFilter extends Filter {

    _value: string;

    get Value(): string {
        return this._value || '';
    };

    set Value(value: string) {
        this._value = value;
    }

    setType() {
        this._type = FilterTypeEnum.StringContains;
    }

    toServer() {
        return this.Value;
    }

    reset(): void {
        this.Value = '';
    }
}

export class CheckBoxFilter extends Filter {

    public Values: string[];

    public CheckedValues: string[];

    constructor(values: string[]) {
        super();
        this.Values = values;
        this.CheckedValues = [];
    }

    setType() {
        this._type = FilterTypeEnum.EnumCheckBoxes;
    }

    toServer() {
        return this.CheckedValues;
    }

    reset(): void {
        this.CheckedValues = [];
    }
}

export class Filters extends Dictionary<string, IFilter> implements IServerable, IResetable {

    constructor() {
        super();
        this.setValue('Keyword', new ContainFilter());
    }

    get Keyword(): ContainFilter { return this.getValue('Keyword') as ContainFilter; }

    toServer(): any {
        let obj = {};
 
        this.forEach((key, value) => {
            obj[key] = value.toServer();
        });

        return obj;
    }

    reset(): void {
        this.forEach((key, value) => {
            value.reset();
        });
    }
    
}

export class EntityStateFilters extends Filters {

    get EntityStatuses(): CheckBoxFilter { return this.getValue('EntityStatuses') as CheckBoxFilter; }

    constructor() {
        super();
        this.setValue('EntityStatuses', new CheckBoxFilter(EnumValues.getNames(EntityStatusEnum)));
    }
}