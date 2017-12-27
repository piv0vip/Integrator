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
        currentGroup: {},
        onClose: function () { }
    },

    requestDataTask: {
        showEditDialog: false,
        currentTask: {},
        onClose: function () { }
    },

    showEditDataTaskDialog: false,

    handlerTypes: new HandlerTypes(),

    cronPresets: new Array<string>(),

    iDataTaskGroups: new Array<IDataTaskGroup>()
};

const getters = {

    requestGroup: state => state.requestGroup,

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

    editDataTaskGroup(state, payload: { currentGroup?: DataTaskGroup, onClose?: Function }) {
        state.requestGroup.currentGroup = payload.currentGroup || new DataTaskGroup();
        state.requestGroup.onClose = function (data) {
            if (payload.onClose) payload.onClose(data);
            state.requestGroup.showEditDialog = false;
        };
        state.requestGroup.showEditDialog = true;
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
        let group: IDataTaskGroup = _.find(state.iDataTaskGroups, (group: IDataTaskGroup) => group.dataTaskGroupId == entity.dataTaskGroupId);
        let index = _.findIndex(group.dataTaskList, function (o: IDataTask) { return o.dataTaskId === entity.dataTaskId })
        if (index < 0) {
            Vue.set(group.dataTaskList, group.dataTaskList.length, entity);
        } else {
            Vue.set(group.dataTaskList, index, entity);
        }
    },

    removeDataTask(state, entity: IDataTask) {
        let group: IDataTaskGroup = _.find(state.iDataTaskGroups, (group: IDataTaskGroup) => group.dataTaskGroupId == entity.dataTaskGroupId);
        let index = _.findIndex(group.dataTaskList, (dataTask: IDataTask) => dataTask.dataTaskId === entity.dataTaskId);
        Vue.delete(group.dataTaskList, index);
    },

    modifyDataTaskGroup(state, entity: IDataTaskGroup) {
        let index = _.findIndex(state.iDataTaskGroups, function (o: IDataTaskGroup) { return o.dataTaskGroupId === entity.dataTaskGroupId })
        if (!entity.dataTaskList) { entity.dataTaskList = [] }
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
