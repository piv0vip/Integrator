import { HandlerTypes } from '../../classes/settings/handlerTypes';
import { HTTP } from '../../util/http-common';
import { AxiosResponse } from 'axios';
import { DataTaskService } from '../../services';
import { DataTask } from '../../models/DataTask';
import { TaskStatusEnum } from '../../enums';
import { Dictionary } from 'typescript-collections';

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

    sethandlerTypes(state, handlerTypesJson) {
        state.handlerTypes.Parse(handlerTypesJson);
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
            HTTP.get('DataTask/GetHandlersWithDefaultSettings')
                .then((response: AxiosResponse) => {
                    commit('sethandlerTypes', response.data);
                    resolve();
                })
                .catch(e => {
                    reject(e);
                });
        });
    },

    getCronPresets({ commit }) {
        return new Promise((resolve, reject) => {
            HTTP.get('DataTask/CrontabPresets')
                .then((response: AxiosResponse) => {
                    commit('setCronPresets', response.data);
                    resolve();
                })
                .catch(e => { reject(e); });
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
