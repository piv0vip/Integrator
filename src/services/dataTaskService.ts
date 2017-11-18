import { DataTask } from '../models';
import { IPagedList, PagedList } from '../interfaces';
import { HTTP } from '../util/http-common';
import { AxiosResponse } from 'axios';
import { HandlerTypes } from '../classes/settings/handlerTypes';
import { BaseService } from './baseService';

export class DataTaskService extends BaseService {
    protected setControllerName() {
        this.ControllerName = 'DataTask';
    }

    public static getPagedList(handlers: HandlerTypes, ctx: { currentPage: number, filter: string, perPage: number, sortBy: string, sortDesc: boolean }): Promise<{ metadata: IPagedList, data: DataTask[] }> {
        let service = new DataTaskService();

        let dataTasks: DataTask[] = [];
        let pagedList: PagedList = new PagedList();

        return new Promise((resolve, reject) => {
            service.getPagedList(ctx)
                .then((response: AxiosResponse) => {
                    pagedList = response.data['metadata'];

                    response.data['entities'].forEach((dataTask) => {
                        dataTasks.push(DataTask.createDataTaskFromJson(handlers, dataTask));
                    });

                    resolve({ metadata: pagedList, data: dataTasks });
                })
                .catch((error) => {
                    reject('Error');
                });
        });
    }
}