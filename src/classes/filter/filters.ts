import Vue from 'vue';
import { Dictionary } from 'typescript-collections';
import { FilterTypeEnum, EntityStatusEnum } from '../../enums';
import { EnumValues } from 'enum-values';
import _ from 'lodash';
import moment from 'moment';

import { IEntityFilter, IPagedListReq } from '../../interfaces';

import store from '../../store';


export interface IServerable {
    toServer(): any;
} 

export interface IResetable {
    reset(): void;
    isDefault(): boolean;
}

export interface IFilter extends IServerable, IResetable {
    readonly Type: FilterTypeEnum;
    setToDefault();
    FilterData: any;
}

export class FilterFactory {
    public static getFilter(filterType: FilterTypeEnum = FilterTypeEnum.Null): IFilter {
        switch (filterType) {
            case FilterTypeEnum.StringList:
                return new CheckBoxFilter();
            case FilterTypeEnum.Multiselect:
                return new MultiselectFilter();
            case FilterTypeEnum.Date:
                return new DateFilter();
            case FilterTypeEnum.Period:
                return new PeriodFilter();
            case FilterTypeEnum.StringContains:
                return new ContainFilter();
            default:
                return new NullFilter();
        }
    }
}

export abstract class Filter<T> implements IFilter {

    protected _filterData: T;

    abstract FilterData: T;

    protected _type: FilterTypeEnum;

    constructor() {
        this.setType();
        this.init();
    }

    get Type(): FilterTypeEnum { return this._type; }

    abstract setType();
    init() { };
    abstract toServer();

    reset(): void {
        if (!this.isDefault()) { this.setToDefault(); }
    };

    abstract setToDefault();
    abstract isDefault(): boolean;

}

export class NullFilter extends Filter<string> {

    FilterData: string;

    setType() {
        this._type = FilterTypeEnum.Null;
    }

    toServer() {
        return '';
    }

    setToDefault() { }

    isDefault(): boolean { return true; }
}

export class ContainFilter extends Filter<string> {

    FilterData: string = '';

    constructor() {
        super();
        this.reset();
    }

    setType() {
        this._type = FilterTypeEnum.StringContains;
    }

    toServer() {
        return this.FilterData;
    }

    setToDefault(): void {
        Vue.set(this, 'FilterData', '');
    }

    isDefault(): boolean {
        return this.FilterData === '';
    }
}

export class CheckBoxFilter extends Filter<string[]> {

    public Values: string[] = [];

    FilterData: string[] = [];

    constructor(values?: string[]) {
        super();
        this.reset();
    }

    setType() {
        this._type = FilterTypeEnum.StringList;
    }

    toServer() {
        return { values: this.FilterData };
    }

    setToDefault(): void {
        Vue.set(this, 'FilterData',  []);
    }

    isDefault(): boolean {
        return _.isArray(this.FilterData) && this.FilterData.length === 0;
    }
}

export class MultiselectFilter extends CheckBoxFilter {

    setType() {
        this._type = FilterTypeEnum.Multiselect;
    }
}

export class PeriodFilter extends Filter<{From: string, To: string}> {

    readonly format: string = 'YYYY-MM-DD';

    FilterData: { From: string, To: string } = {From: '', To: ''};

    public Values: string[] = [];

    constructor() {
        super();
        this.reset();
    }

    get FormatStr(): string { return this.format; }

    setType() {
        this._type = FilterTypeEnum.Period;
    }

    toServer() {
        return {
            from: moment(this.FilterData.From).hour(0).minute(0).second(0).format(`YYYY-MM-DD HH:mm:ss`),
            to: moment(this.FilterData.To).hour(23).minute(59).second(59).format(`YYYY-MM-DD HH:mm:ss`)
        };
    }

    setToDefault() {
        let curDate = moment(new Date()).utc().format('YYYY-MM-DD');
        Vue.set(this.FilterData, 'From', curDate);
        Vue.set(this.FilterData, 'To', curDate);
    }

    isDefault(): boolean {
        let curDate = moment(new Date()).utc().format('YYYY-MM-DD');
        return this.FilterData['From'] === curDate && this.FilterData['To'] === curDate;
    }
}

export class DateFilter extends Filter<string> {

    private _date: PeriodFilter;

    constructor() {
        super();
    }

    init() {
        this._date = new PeriodFilter();
    }

    setType() {
        this._type = FilterTypeEnum.Date;
    }

    get FilterData(): string {
        return this._date.FilterData.From;
    };

    set FilterData(value: string) {
        this._date.FilterData = { From: value, To: value };
    };

    toServer() {
        return this._date.toServer();
    }

    setToDefault() {
        this._date.setToDefault();
    }

    isDefault(): boolean {
        return this._date.isDefault();
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

export class PagedListReq implements IPagedListReq {
    currentPage: number = 1;
    filters: IEntityFilter[] = [];
    perPage: number = 10;
    sortBy: string = 'RecModified';
    sortDesc: boolean = true;

    constructor(params?: IPagedListReq) {
        if (params) {
            this.sortBy = params.sortBy;
        }
    }
}