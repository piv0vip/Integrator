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
        this.reset();
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

    get FilterData(): string {
        return this._filterData || '';
    };

    set FilterData(value: string) {
        this._filterData = value;
    }

    setType() {
        this._type = FilterTypeEnum.StringContains;
    }

    toServer() {
        return this.FilterData;
    }

    setToDefault(): void {
        this.FilterData = '';
    }

    isDefault(): boolean {
        return this.FilterData === '';
    }
}

export class CheckBoxFilter extends Filter<string[]> {

    public Values: string[] = [];

    constructor(values?: string[]) {
        super();
        this.Values = values || [];
        this.FilterData = [];
    }

    get FilterData(): string[] {
        return this._filterData || [];
    };

    set FilterData(value: string[]) {
        this._filterData = value;
    };

    setType() {
        this._type = FilterTypeEnum.StringList;
    }

    toServer() {
        return { values: this.FilterData };
    }

    setToDefault(): void {
        this.FilterData = [];
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

    private _from: Date;
    private _to: Date;

    public Values: string[] = [];

    constructor() {
        super();
    }

    get FilterData(): {
        From: string;
        To: string;
    } {
        return { From: this.From, To: this.To };
    };

    set FilterData(value: {
        From: string;
        To: string;
    }) {
        this.From = value.From;
        this.To = value.To;
    };

    get FormatStr(): string { return this.format; }

    set From(value: string) {
        console.log(value);
        this._from = moment(value).hour(0).minute(0).second(0).toDate();
    }

    get From(): string {
        return moment(this._from).format('YYYY-MM-DD');
    }

    set To(value: string) {
        this._to = moment(value).hour(23).minute(59).second(59).toDate();
    }

    get To(): string {
        return moment(this._to).format('YYYY-MM-DD');
    }

    setType() {
        this._type = FilterTypeEnum.Period;
    }

    toServer() {
        return {
            from: moment(this._from).hour(0).minute(0).second(0).format(`YYYY-MM-DD HH:mm:ss`),
            to: moment(this._to).hour(23).minute(59).second(59).format(`YYYY-MM-DD HH:mm:ss`)
        };
    }

    setToDefault() {
        let curDate = moment(new Date()).utc().format('YYYY-MM-DD');
        this.From = curDate;
        this.To = curDate;
    }

    isDefault(): boolean {
        let curDate = moment(new Date()).utc().format('YYYY-MM-DD');
        return this.From === curDate && this.To === curDate;
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


export class EntityStatatusDecorator {

    toServer(): IEntityFilter[] {
        return [
            {
                fieldName: 'status',
                existsValues: store.getters.filters.status.toServer()
            },
            {
                fieldName: 'entityType',
                existsValues: store.getters.filters.entityType.toServer()
            },
            {
                fieldName: 'source',
                existsValues: store.getters.filters.source.toServer()
            },
            {
                fieldName: 'target',
                existsValues: store.getters.filters.target.toServer()
            },
            {
                fieldName: 'statusMessage',
                ignoredValues: store.getters.filters.statusMessage.isDefault() ? null : store.getters.filters.statusMessage.toServer()
            },
            {
                fieldName: 'entityVersion',
                period: store.getters.filters.entityVersion.isDefault() ? null : store.getters.filters.entityVersion.toServer()
            },
        ];
    }
}

export class PagedListReq implements IPagedListReq {
    currentPage: number = 1;
    filter: IEntityFilter[] = [];
    perPage: number = 10;
    sortBy: string = 'RecModified';
    sortDesc: boolean = true;
}