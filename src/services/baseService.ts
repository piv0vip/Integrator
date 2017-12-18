import { HTTP } from '../util/http-common';
import { AxiosResponse } from 'axios';
import { IServerable } from '../interfaces';
import { TEntity } from '../models';

import { EntityStatatusDecorator } from '../classes/filter';

export abstract class BaseService {
    protected _controllerName: string = typeof this.constructor.name;

    constructor() {
        this.setControllerName();
    }

    public getPagedList(ctx: { currentPage: number, filter: EntityStatatusDecorator, perPage: number, sortBy: string, sortDesc: boolean }): Promise<AxiosResponse> {
        return new Promise((resolve, reject) => {
            HTTP.post(`${this.ControllerName}/GetPagedList?pageSize=${ctx.perPage}&pageNumber=${ctx.currentPage}&sortBy=${ctx.sortBy}&sortDesc=${ctx.sortDesc}`, ctx.filter)
                .then(response => { resolve(response); })
                .catch(error => { reject(Error); });
        });
    }

    public getList(): Promise<AxiosResponse> {
        return new Promise((resolve, reject) => {
            HTTP.get(`${this.ControllerName}/GetList`)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(Error);
                });
        });
    }

    protected get ControllerName(): string { return this._controllerName; }

    protected set ControllerName(value: string) { this._controllerName = value; }

    protected abstract setControllerName();
}