import * as Vue from 'vue';
import Vuex from 'vuex';
import { HandlerTypes } from './classes/settings/handlerTypes';
import { HTTP } from './util/http-common';
import { AxiosResponse } from 'axios';
import { DataTaskService } from './services';
import { DataTask } from './models/DataTask';

import { Dictionary } from 'typescript-collections';

import { TaskStatusEnum } from './enums';

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,
    state: {
        handlerTypes: new HandlerTypes(),
        cronPresets: new Array<string>(),
        dataTasks: new Array<DataTask>(),

        entityStatuses: ''
    },
    
    getters: {
        dataTasksArray: state => state.dataTasks
    },
    
    mutations: {
        setCronPresets(state, cronPresets: string[]) {
            state.cronPresets = cronPresets;
        },

        sethandlerTypes(state, handlerTypesJson) {
            state.handlerTypes.Parse(handlerTypesJson);
        },

        setDataTasks(state, dataTasks: DataTask[]) {
            state.dataTasks = dataTasks;
        },

        setDataTaskStatus(state, status: TaskStatusEnum) {
            state.dataTasks[0].Status = status;
        },

        setEntityStatuses(state, statuses: string) {
            state.entityStatuses = statuses;
        }

    },
    
    actions: {
        
        getHandlerTypes({ commit }) {
            return new Promise( (resolve, reject) => {
                HTTP.get('DataTask/GetHandlersWithDefaultSettings')
                .then( (response: AxiosResponse) => {
                    commit('sethandlerTypes', response.data);
                    resolve();
                })
                .catch( e => { reject(e); });
            });
        },

        getCronPresets({ commit }) {
            return new Promise( (resolve, reject) => {
                HTTP.get('DataTask/CrontabPresets')
                .then( (response: AxiosResponse) => {
                    commit('setCronPresets', response.data);
                    resolve();
                })
                .catch( e => { reject(e); });
            });
        },

        getDataTasks({ dispatch, commit }) {
            return new Promise( (resolve, reject) => {
                dispatch('getHandlerTypes').then( () => {
                    dispatch('getCronPresets').then( () => {
                        DataTaskService.getList()
                        .then( ( response: DataTask[] ) => {
                            commit('setDataTasks', response);
                            resolve();
                        })
                        .catch( (e) => { console.log(e); });
                    });
                });
            });
        },

        getEntityStatuses({ dispatch, commit }) {
            return new Promise((resolve, reject) => {
                HTTP.get('EntityStatus/GetFilterValues')
                    .then((response: AxiosResponse) => {
                        commit('setEntityStatuses', response.data);
                        resolve();
                    })
                    .catch(e => { reject(e); });
            });
        }
    },
    
    modules: {},
});