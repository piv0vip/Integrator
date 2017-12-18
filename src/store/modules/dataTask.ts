import { HandlerTypes } from '../../classes/settings/handlerTypes';
import { HTTP } from '../../util/http-common';
import { AxiosResponse } from 'axios';
import { DataTaskService, DataTaskGroupService } from '../../services';
import { DataTask, DataTaskGroup } from '../../models';
import { TaskStatusEnum } from '../../enums';
import { Dictionary } from 'typescript-collections';

import { IHandler, DataTask as IDataTask } from '../../api/models';

import * as msRest from 'ms-rest-js';

const state = {

    handlerTypes: new HandlerTypes(),

    cronPresets: new Array<string>(),

    dataTasks: new Dictionary<number, DataTask>(),

    dataTaskGroups: new Dictionary<number, DataTaskGroup>(),

    dataTasksArray: new Array<DataTask>(),

    dataTaskGroupsArray: new Array<DataTaskGroup>()
};

const getters = {
    handlerTypes: state => state.handlerTypes,
    dataTasks: state => state.dataTasks,
    dataTasksArray: state => state.dataTasksArray,
    dataTaskGroupsArray: state => state.dataTaskGroupsArray,
    //dataTaskGroupsAsSelect: state => {}
};

const mutations = {
    setCronPresets(state, cronPresets: string[]) {
        state.cronPresets = cronPresets;
    },

    sethandlerTypes(state, iHandler: IHandler[]) {
        state.handlerTypes.Parse(iHandler);
    },

    setDataTasks(state, dataTasks: DataTask[]) {
        // let ddd = new Dictionary<number, DataTask>();
        dataTasks.forEach((dataTask: DataTask) => {
            state.dataTasks.setValue(dataTask.DataTaskId, dataTask);
        });

        state.dataTasksArray = state.dataTasks.values();
        // state.dataTasks = dataTasks;
    },

    setDataTaskGroups(state, dataTaskGroups: DataTaskGroup[]) {
        dataTaskGroups.forEach((dataTaskGroup: DataTaskGroup) => {
            state.dataTaskGroups.setValue(dataTaskGroup.DataTaskGroupId, dataTaskGroup);
        });
        state.dataTaskGroupsArray = state.dataTaskGroups.values();
    },

    setDataTaskStatus(state, status: TaskStatusEnum) {
        state.dataTasks[0].Status = status;
    },

    dataTaskEvent(state, dataTaskJson) {
        let dataTask = DataTask.createDataTaskFromJson(dataTaskJson as IDataTask);
        state.dataTasks.setValue(dataTask.DataTaskId, dataTask);
        state.dataTasksArray = state.dataTasks.values();
    }

};

const actions = {

    getHandlerTypes({ commit }) {
        return new Promise((resolve, reject) => {
            HTTP.get('DataTask/GetHandlersWithDefaultSettings')
                .then((response) => {
                    commit('sethandlerTypes', response.data as IHandler[]);
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getCronPresets({ commit }) {
        return new Promise((resolve, reject) => {
            HTTP.get('DataTask/CrontabPresets')
                .then((response) => {
                    commit('setCronPresets', response.data as string[]);
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getDataTasks({ dispatch, commit }) {
        commit('loading', true);

        return new Promise((resolve, reject) => {
            dispatch('getHandlerTypes').then(() => {
                dispatch('getCronPresets').then(() => {
                    DataTaskGroupService.getList()
                        .then((response: DataTaskGroup[]) => {
                            commit('setDataTaskGroups', response);
                            commit('loading', false);
                            resolve();
                        })
                        .catch((e) => {
                            commit('loading', false);
                            console.log(e);
                        });
                });
            });
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
