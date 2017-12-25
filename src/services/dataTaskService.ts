import { DataTask } from '../models';
import { IPagedListReq, IPagedList, PagedList } from '../interfaces';
import { HTTP } from '../util/http-common';
import { AxiosResponse } from 'axios';
import { HandlerTypes } from '../classes/settings/handlerTypes';
import { BaseService } from './baseService';
import store from '../store';

export class DataTaskService extends BaseService {
    protected setControllerName() {
        this.ControllerName = 'DataTask';
    }

    public static getList(): Promise<DataTask[]> {
        let service = new DataTaskService();
        let dataTasks: DataTask[] = [];
        return new Promise((resolve, reject) => {
            service.getList()
                .then((response: AxiosResponse) => {

                    response.data.forEach((dataTask) => {
                        dataTasks.push(DataTask.createDataTaskFromJson(dataTask));
                    });

                    resolve(dataTasks);
                })
                .catch((error) => {
                    reject('Error');
                });
        });
    }

    public static getPagedList(ctx: IPagedListReq): Promise<{ metadata: IPagedList, data: DataTask[] }> {
        let service = new DataTaskService();

        let dataTasks: DataTask[] = [];
        let pagedList: PagedList = new PagedList();

        return new Promise((resolve, reject) => {
            service.getPagedList(ctx)
                .then((response: AxiosResponse) => {
                    pagedList = response.data['metadata'];

                    response.data['entities'].forEach((dataTask) => {
                        dataTasks.push(DataTask.createDataTaskFromJson(dataTask));
                    });

                    resolve({ metadata: pagedList, data: dataTasks });
                })
                .catch((error) => {
                    reject('Error');
                });
        });
    }
}