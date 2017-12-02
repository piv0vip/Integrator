import { Dictionary } from 'typescript-collections';
import { FilterTypeEnum, EntityStatusEnum } from '../../enums';
import { EnumValues } from 'enum-values';
import _ from 'lodash';


export interface IServerable {
    toServer(): any;
} 

export interface IResetable {
    reset(): void;
    isDefault(): boolean;
}

export interface IFilter extends IServerable, IResetable {
    ChangesToggle: boolean;
    readonly Type: FilterTypeEnum;
    setToDefault();
}

export abstract class Filter implements IFilter {
    ChangesToggle: boolean = false;

    protected _type: FilterTypeEnum;

    constructor() {
        this.setType();
        this.reset();
    }

    get Type(): FilterTypeEnum { return this._type; }

    abstract setType();
    abstract toServer();

    reset(): void {
        if (!this.isDefault()) { this.setToDefault(); }
    };

    abstract setToDefault();
    abstract isDefault(): boolean;

    static getFilter(filterType: FilterTypeEnum = FilterTypeEnum.Null): IFilter {
        switch (filterType) {
            case FilterTypeEnum.StringList:
                return new CheckBoxFilter([]);
            case FilterTypeEnum.Multiselect:
                return new MultiselectFilter([]);
            case FilterTypeEnum.Date:
                return new DateFilter([]);
            case FilterTypeEnum.StringContains:
                return new ContainFilter();
            default:
                return new NullFilter();
        }
    }
// ZHaXXX
    static getFilterFromFilter(filter: IFilter): IFilter {
        switch (filter.Type) {
            case FilterTypeEnum.StringList:
                return new CheckBoxFilter((filter as CheckBoxFilter).Values);
            case FilterTypeEnum.Multiselect:
                return new MultiselectFilter((filter as MultiselectFilter).Values);
            case FilterTypeEnum.Date:
                return new DateFilter((filter as DateFilter).Values);
            case FilterTypeEnum.StringContains:
                return new ContainFilter();
            default:
                return new NullFilter();
        }
    }

    protected toggleChanges() {
        this.ChangesToggle = !this.ChangesToggle;
    }
}

export class NullFilter extends Filter {
    setType() {
        this._type = FilterTypeEnum.Null;
    }
    toServer() {
        return '';
    }
    setToDefault() { }

    isDefault(): boolean { return true; }
}

export class ContainFilter extends Filter {

    private _value: string;

    get Value(): string {
        return this._value || '';
    };

    set Value(value: string) {
        this._value = value;
        this.toggleChanges();
    }

    setType() {
        this._type = FilterTypeEnum.StringContains;
    }

    toServer() {
        return this.Value;
    }

    setToDefault(): void {
        this.Value = '';
    }

    isDefault(): boolean {
        return this.Value === '';
    }
}

export class CheckBoxFilter extends Filter {

    private _checkedValues: string[]; 

    public Values: string[] = [];

    get CheckedValues(): string[] {
        return this._checkedValues || [];
    }

    set CheckedValues(values: string[]) {
        this._checkedValues = values;
        this.toggleChanges();
    }

    constructor(values: string[]) {
        super();
        this.Values = values || [];
        this.CheckedValues = [];
    }

    setType() {
        this._type = FilterTypeEnum.StringList;
    }

    toServer() {
        return this.CheckedValues;
    }

    setToDefault(): void {
        this.CheckedValues = [];
    }

    isDefault(): boolean {
        return _.isArray(this.CheckedValues) && this.CheckedValues.length === 0;
    }
}

export class MultiselectFilter extends CheckBoxFilter {

    setType() {
        this._type = FilterTypeEnum.Multiselect;
    }
}

export class DateFilter extends CheckBoxFilter {

    setType() {
        this._type = FilterTypeEnum.Date;
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
    
    isDefault(): boolean {
        return _.every(this.values(), (value: IFilter) => {
            return value.isDefault();
        });
    }
}

export class EntityStatatusFilters extends Filters {

    get EntityStatuses(): CheckBoxFilter { return this.getValue('EntityStatuses') as CheckBoxFilter; }

    get StatusMessages(): MultiselectFilter { return this.getValue('StatusMessages') as MultiselectFilter; }

    get EntityTypes(): CheckBoxFilter { return this.getValue('EntityTypes') as CheckBoxFilter; }

    get Sources(): CheckBoxFilter { return this.getValue('Sources') as CheckBoxFilter; }

    get Targets(): CheckBoxFilter { return this.getValue('Targets') as CheckBoxFilter; }

    get Versions(): DateFilter { return this.getValue('Versions') as DateFilter; }

    constructor() {
        super();
        this.setValue('EntityStatuses', new CheckBoxFilter(EnumValues.getNames(EntityStatusEnum)));
        this.setValue('StatusMessages', new MultiselectFilter([]));
        this.setValue('EntityTypes', new CheckBoxFilter([]));
        this.setValue('Sources', new CheckBoxFilter([]));
        this.setValue('Targets', new CheckBoxFilter([]));
        this.setValue('Versions', new DateFilter([]));
    }
}