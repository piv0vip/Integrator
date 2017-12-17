import { HandlerTypes } from '../../classes/settings/handlerTypes';
import { HTTP, API } from '../../util/http-common';
import { AxiosResponse } from 'axios';
import { DataTaskService } from '../../services';
import { DataTask } from '../../models/DataTask';
import { TaskStatusEnum } from '../../enums';
import { Dictionary } from 'typescript-collections';

import { IntegratorAPI, IntegratorAPIModels as Models } from '../../api/integratorAPI';

import * as msRest from 'ms-rest-js';

const state = {

    handlerTypes: new HandlerTypes(),

    cronPresets: new Array<string>(),

    dataTasks: new Dictionary<number, DataTask>(),

    dataTasksArray: new Array<DataTask>()
};

const getters = {
    dataTasks: state => state.dataTasks,
    dataTasksArray: state => state.dataTasksArray
};

const mutations = {
    setCronPresets(state, cronPresets: string[]) {
        state.cronPresets = cronPresets;
    },

    sethandlerTypes(state, iHandler: Models.IHandler[]) {
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

    setDataTaskStatus(state, status: TaskStatusEnum) {
        state.dataTasks[0].Status = status;
    },

    dataTaskEvent(state, dataTaskJson) {
        let dataTask = DataTask.createDataTaskFromJson(state.handlerTypes, dataTaskJson);
        state.dataTasks.setValue(dataTask.DataTaskId, dataTask);
        state.dataTasksArray = state.dataTasks.values();
    }

};

const actions = {

    getHandlerTypes({ commit }) {
        return new Promise((resolve, reject) => {
            API.restDataTaskGetHandlersWithDefaultSettingsGet()
                .then((data) => {
                    commit('sethandlerTypes', data);
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },

    getCronPresets({ commit }) {
        return new Promise((resolve, reject) => {
            API.restDataTaskCrontabPresetsGet()
                .then((data) => {
                    commit('setCronPresets', data);
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },

    getDataTasks({ dispatch, commit }) {
        commit('loading', true);

        return new Promise((resolve, reject) => {
            dispatch('getHandlerTypes').then(() => {
                dispatch('getCronPresets').then(() => {
                    DataTaskService.getList()
                        .then((response: DataTask[]) => {
                            commit('setDataTasks', response);
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
