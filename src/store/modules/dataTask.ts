import Vue from 'vue';
import { HandlerTypes } from '../../classes/settings/handlerTypes';
import { HTTP } from '../../util/http-common';
import { AxiosResponse } from 'axios';
import { DataTaskService, DataTaskGroupService } from '../../services';
import { DataTask, DataTaskGroup } from '../../models';
import { TaskStatusEnum, EntityStateEnum } from '../../enums';
import { Dictionary } from 'typescript-collections';

import { IHandler, DataTask as IDataTask, DataTaskGroup as IDataTaskGroup } from '../../api/models';

import * as msRest from 'ms-rest-js';

import _ from 'lodash';

const state = {

    requestGroup: {
        showEditDialog: false,
        current: null,
        onClose: function () { }
    },

    requestTask: {
        showEditDialog: false,
        current: null,
        onClose: function () { }
    },

    showEditDataTaskDialog: false,

    handlerTypes: new HandlerTypes(),

    cronPresets: new Array<string>(),

    iDataTaskGroups: new Array<IDataTaskGroup>()
};

const getters = {

    requestGroup: state => state.requestGroup,
    requestTask: state => state.requestTask,

    handlerTypes: state => state.handlerTypes,

    dataTaskGroupsAsSelect: state => {
        return state.iDataTaskGroups.map((dataTaskGroup: IDataTaskGroup) => {
            return {
                value: dataTaskGroup.dataTaskGroupId,
                text: dataTaskGroup.name
            };
        });
    },

    iDataTaskGroups: state => state.iDataTaskGroups
};

const mutations = {

    editDataTaskGroup(state, payload: { current: DataTaskGroup, onClose?: Function }) {
        state.requestGroup.current = payload.current || new DataTaskGroup();
        state.requestGroup.onClose = (data) => {
            if (payload.onClose) payload.onClose(data);
            Vue.set(state.requestGroup, 'showEditDialog', false);
        };
        Vue.set(state.requestGroup, 'showEditDialog', true);
    },

    editDataTask(state, payload: { current: DataTask, onClose?: Function }) {
        state.requestTask.current = payload.current || new DataTask();
        state.requestTask.onClose = (data) => {
            if (payload.onClose) payload.onClose(data);
            Vue.set(state.requestTask, 'showEditDialog', false);
        };
        Vue.set(state.requestTask, 'showEditDialog', true);
    },

    dataTaskDialogVisible(state, payLoad: boolean) {
        state.showEditDataTaskDialog = payLoad;
    },

    dataTaskGroupDialogVisible(state, payLoad: boolean) {
        state.requestGroup.showEditDialog = payLoad;
    },

    setCronPresets(state, cronPresets: string[]) {
        state.cronPresets = cronPresets;
    },

    sethandlerTypes(state, iHandler: IHandler[]) {
        state.handlerTypes.Parse(iHandler);
    },

    setIDataTaskGroups(state, dataTaskGroups: IDataTaskGroup[]) {
        state.iDataTaskGroups = dataTaskGroups;
    },

    modifyDataTask(state, entity: IDataTask) {

        let oldGroupOfDataTask: IDataTaskGroup = _.find(state.iDataTaskGroups, (group: IDataTaskGroup) => {
            let dataTask = _.find(group.dataTaskList, (dataTask: IDataTask) => dataTask.dataTaskId === entity.dataTaskId);
            return !!dataTask;
        });

        let group: IDataTaskGroup = null;

        if (oldGroupOfDataTask) {
            if (oldGroupOfDataTask.dataTaskGroupId === entity.dataTaskGroupId) {
                group = oldGroupOfDataTask;
            } else {
                let index = _.findIndex(oldGroupOfDataTask.dataTaskList, function (o: IDataTask) { return o.dataTaskId === entity.dataTaskId; });
                if (index >= 0) {
                    _.remove(oldGroupOfDataTask.dataTaskList, (dataTask: IDataTask) => dataTask.dataTaskId === entity.dataTaskId);
                }
                group = _.find(state.iDataTaskGroups, (group: IDataTaskGroup) => group.dataTaskGroupId === entity.dataTaskGroupId);
            }
        } else {
            group = _.find(state.iDataTaskGroups, (group: IDataTaskGroup) => group.dataTaskGroupId === entity.dataTaskGroupId);
        }

        if (group) {
            let index = _.findIndex(group.dataTaskList, function (o: IDataTask) { return o.dataTaskId === entity.dataTaskId; });
            if (index < 0) {
                Vue.set(group.dataTaskList, group.dataTaskList.length, entity);
            } else {
                Vue.set(group.dataTaskList, index, entity);
            }
        }
    },

    removeDataTask(state, entity: IDataTask) {
        let group: IDataTaskGroup = _.find(state.iDataTaskGroups, (group: IDataTaskGroup) => group.dataTaskGroupId === entity.dataTaskGroupId);
        let index = _.findIndex(group.dataTaskList, (dataTask: IDataTask) => dataTask.dataTaskId === entity.dataTaskId);
        Vue.delete(group.dataTaskList, index);
    },

    modifyDataTaskGroup(state, entity: IDataTaskGroup) {
        debugger;
        let index = _.findIndex(state.iDataTaskGroups, function (o: IDataTaskGroup) { return o.dataTaskGroupId === entity.dataTaskGroupId; });
        let dataTaskList = (index < 0) ? [] : state.iDataTaskGroups[index].dataTaskList || [];
        if (!entity.dataTaskList) { entity.dataTaskList = dataTaskList; }
        if (index < 0) {
            Vue.set(state.iDataTaskGroups, state.iDataTaskGroups.length, entity);
        } else {
            Vue.set(state.iDataTaskGroups, index, entity);
        }
    },

    removeDataTaskGroup(state, entity: IDataTaskGroup) {
        let index = _.findIndex(state.iDataTaskGroups, (dataTaskGroup: IDataTaskGroup) => dataTaskGroup.dataTaskGroupId === entity.dataTaskGroupId);
        Vue.delete(state.iDataTaskGroups, index);
    }
};

const actions = {

    updateDataTask({ commit }, entity: { state: EntityStateEnum, entity: IDataTask }) {
        switch (entity.state) {
            case EntityStateEnum.Modified:
                commit('modifyDataTask', entity.entity);
                break;
            case EntityStateEnum.Added:
                commit('modifyDataTask', entity.entity);
                break;
            case EntityStateEnum.Deleted:
                commit('removeDataTask', entity.entity);
                break;
            default:
        }
    },

    updateDataTaskGroup({ commit }, entity: { state: EntityStateEnum, entity: IDataTaskGroup }) {
        switch (entity.state) {
            case EntityStateEnum.Modified:
                commit('modifyDataTaskGroup', entity.entity);
                break;
            case EntityStateEnum.Added:
                commit('modifyDataTaskGroup', entity.entity);
                break;
            case EntityStateEnum.Deleted:
                commit('removeDataTaskGroup', entity.entity);
                break;
            default:
        }
    },

    getHandlerTypes({ commit }) {
        return new Promise((resolve, reject) => {
            HTTP.get('Scheduler/GetHandlersWithDefaultSettings')
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

    getIDataTaskGroups({ commit }) {
        return new Promise((resolve, reject) => {
            HTTP.get('DataTaskGroup/GetList')
                .then((response) => {
                    commit('setIDataTaskGroups', response.data as IDataTaskGroup[]);
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
                    dispatch('getIDataTaskGroups').then(() => {
                        commit('loading', false);
                        resolve();
                    })
                        .catch(() => {
                            commit('loading', false);
                            reject();
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
