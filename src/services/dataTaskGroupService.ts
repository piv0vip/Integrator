import { DataTaskGroup } from '../models';
import { IPagedList, PagedList } from '../interfaces';
import { HTTP } from '../util/http-common';
import { AxiosResponse } from 'axios';
import { HandlerTypes } from '../classes/settings/handlerTypes';
import { BaseService } from './baseService';
import store from '../store';

import { DataTaskGroup as IDataTaskGroup } from '../api/models';

export class DataTaskGroupService extends BaseService {
    protected setControllerName() {
        this.ControllerName = 'DataTaskGroup';
    }

    public static getList(): Promise<DataTaskGroup[]> {
        let service = new DataTaskGroupService();
        let dataTaskGroups: DataTaskGroup[] = [];
        return new Promise((resolve, reject) => {
            service.getList()
                .then((response: AxiosResponse) => {
                    response.data.forEach((dataTaskGroup: IDataTaskGroup) => {
                        dataTaskGroups.push( new DataTaskGroup(dataTaskGroup));
                    });
                    resolve(dataTaskGroups);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

}