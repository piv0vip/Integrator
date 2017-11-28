import { EntityStatus } from '../models';
import { IPagedList, PagedList } from '../interfaces';
import { HTTP } from '../util/http-common';
import { AxiosResponse } from 'axios';
import { HandlerTypes } from '../classes/settings/handlerTypes';
import { BaseService } from './baseService';

import { Filters } from '../classes/filter';

export class EntityStatusService extends BaseService {
    
    protected setControllerName() {
        this.ControllerName = 'EntityStatus';
    }

    public static getPagedList(ctx: { currentPage: number, filter: Filters, perPage: number, sortBy: string, sortDesc: boolean }): Promise<{metadata: IPagedList, data: EntityStatus[]}> {

        let service = new EntityStatusService();

        let entityStatuses: EntityStatus[] = [];
        let pagedList: PagedList = new PagedList(); 

        return new Promise( (resolve, reject) => {

            service.getPagedList(ctx)
            .then( ( response: AxiosResponse ) => {

                pagedList = response.data['metadata'];
            
                response.data['entities'].forEach( (entity) => {
                    entityStatuses.push(EntityStatus.createFromJson(entity));
                });
            
                resolve( {metadata: pagedList, data: entityStatuses} );    
            } )
            .catch( (error) => {
                reject('Error');
           } );
        } );
    }

    public static createEntities( entities: EntityStatus[] ) {

        let service = new EntityStatusService();
        
        return new Promise( (resolve, reject) => {
            service.createNewEntities(entities)
            .then( ( response: AxiosResponse ) => {
                resolve( response );    
            } )
            .catch( (error) => {
                reject('Error');
            });
        });
    }
    
}