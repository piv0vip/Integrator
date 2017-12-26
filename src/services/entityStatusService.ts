import { EntityStatus } from '../models';
import { IPagedListReq, IEntityFilter, IPagedList, PagedList } from '../interfaces';
import { HTTP } from '../util/http-common';
import { AxiosResponse } from 'axios';
import { HandlerTypes } from '../classes/settings/handlerTypes';
import { BaseService } from './baseService';

import { PagedListResponseEntityStatus } from '../api/models';

export class EntityStatusService extends BaseService {
    
    protected setControllerName() {
        this.ControllerName = 'EntityStatus';
    }

    public static getPagedList(ctx: IPagedListReq): Promise<{ metadata: IPagedList, data: EntityStatus[] }> {

        let service = new EntityStatusService();

        let entityStatuses: EntityStatus[] = [];
        let pagedList: PagedList = new PagedList(); 

        return new Promise( (resolve, reject) => {


            HTTP.post(`EntityStatus/GetPagedList`, ctx)
                .then(response => {
                    let data: PagedListResponseEntityStatus = response.data as PagedListResponseEntityStatus;
                    resolve();
                })
                .catch(error => {
                    reject(Error);
                });


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
}