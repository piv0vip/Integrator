import { HTTP } from '../util/http-common';
import { AxiosResponse } from 'axios';
import { IServerable } from '../interfaces'
import { TEntity } from '../models'

export abstract class BaseService {
    
    protected _controllerName: string = typeof this.constructor.name;

    constructor() {
        this.setControllerName();
    }

    public getPagedList(ctx: { currentPage: number, filter: string, perPage: number, sortBy: string, sortDesc: boolean }): Promise<AxiosResponse> {
        return new Promise( (resolve, reject) => {
            HTTP.get(`${this.ControllerName}/GetPagedList?pageSize=${ctx.perPage}&pageNumber=${ctx.currentPage}&sortBy=${ctx.sortBy}&sortDesc=${ctx.sortDesc}&filter=${ctx.filter || ''}`,
            {
                headers: { 
                    'pageSize': ctx.perPage,
                    'pageNumber': ctx.currentPage,
                    'filter': ctx.filter,
                    'sortBy': ctx.sortBy,
                    'sortDesc': ctx.sortDesc
                }
            })
            .then( response => { resolve(response); } )
            .catch( error => { reject(Error); } );        
        });
    }

    public createNewEntities(entities: TEntity[]): Promise<AxiosResponse> {
        let toServerEntities: {}[] = entities.map((entity: TEntity) => entity.toServer())
        debugger;
        return new Promise( (resolve, reject) => {
            HTTP.post(`${this.ControllerName}/InsertEntities`, toServerEntities )
            .then( response => { resolve(response); } )
            .catch( error => { reject(Error); } );           
        });
    }

    protected get ControllerName(): string{ return this._controllerName; }
    
    protected set ControllerName(value: string) { this._controllerName = value; }

    protected abstract setControllerName();

}