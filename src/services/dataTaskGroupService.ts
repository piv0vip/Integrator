import { DataTaskGroup } from '../models';
import { IPagedList, PagedList } from '../interfaces';
import { HTTP } from '../util/http-common';
import { AxiosResponse } from 'axios';
import { HandlerTypes } from '../classes/settings/handlerTypes';
import { BaseService } from './baseService';
import store from '../store';

import { EntityStatatusDecorator } from '../classes/filter';

export class DataTaskGroupService extends BaseService {
    protected setControllerName() {
        this.ControllerName = 'DataTask';
    }

    public static getList(): Promise<DataTaskGroup[]> {
        let service = new DataTaskGroupService();
        let dataTaskGroups: DataTaskGroup[] = [];
        return new Promise((resolve, reject) => {
            service.getList()
                .then((response: AxiosResponse) => {

                    response.data.forEach((dataTaskGroup) => {
                        dataTaskGroups.push(DataTaskGroup.createDataTaskGroupFromJson(dataTaskGroup));
                    });

                    resolve(dataTaskGroups);
                })
                .catch((error) => {
                    reject('Error');
                });
        });
    }

}