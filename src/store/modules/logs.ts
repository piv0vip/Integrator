dimport Vue from 'vue';
import { HTTP } from '../../util/http-common';
import { IFilter, FilterFactory, CheckBoxFilter, PagedListReq } from '../../classes/filter';
import { EnumValues } from 'enum-values';
import { EntityStatusEnum, FilterTypeEnum } from '../../enums';

import { PagedListResponseLog, LogsValues, Level as LevelEnum } from '../../api/models';

import _ from 'lodash';
import { AxiosResponse } from 'axios';

const state = function () {
    return {

        filterPresetsLogs: {
            level: []
        },

        filtersLogs: {
            level: FilterFactory.getFilter(FilterTypeEnum.StringList),
            timestamp: FilterFactory.getFilter(FilterTypeEnum.Period),
        },

        pagedListRequestLogs: new PagedListReq({ sortBy: 'timestamp' }),
        pagedListResponseLog: null

    };
}; 

const getters = {

    filterPresetsLogs: state => state.filterPresetsLogs,

    filtersLogs: state => state.filtersLogs,

    filtersLogsIsDefault: state => {
        return _.every(state.filtersLogs, (value: IFilter) => {
            return value.isDefault();
        });
    },

    pagedListRequestLogs: state => state.pagedListRequestLogs,

    logs: state => {
        let ans: PagedListResponseLog = state.pagedListResponseLog as PagedListResponseLog;
        return ans ? ans.entities : [];
    },

    pagedListMetaDataLogs: state => {
        let ans: PagedListResponseLog = state.pagedListResponseLog as PagedListResponseLog;
        return ans ? ans.metadata : {};
    }

};

const mutations = {

    updateFilterLogsValue(state, values: { filterName: string, values: any }) {
        Vue.set(state.filtersLogs[values.filterName], 'FilterData', values.values);
        let temp: PagedListReq = state.pagedListRequestLogs;
        Vue.set(state.pagedListRequestLogs, 'currentPage', temp.currentPage);
        Vue.set(state.pagedListRequestLogs, 'perPage', temp.perPage);
        Vue.set(state.pagedListRequestLogs, 'sortBy', temp.sortBy);
        Vue.set(state.pagedListRequestLogs, 'sortDesc', temp.sortDesc);
        Vue.set(state.pagedListRequestLogs, 'filters', [
            {
                fieldName: 'level',
                existsValues: state.filtersLogs.level.toServer()
            },
            {
                fieldName: 'timestamp',
                period: state.filtersLogs.timestamp.isDefault() ? null : state.filtersLogs.timestamp.toServer()
            },
        ]);
    },

    resetFilterLogs(state, filterName: string) {
        state.filtersLogs[filterName].reset();
        let temp: PagedListReq = state.pagedListRequestLogs;
        Vue.set(state.pagedListRequestLogs, 'currentPage', temp.currentPage);
        Vue.set(state.pagedListRequestLogs, 'perPage', temp.perPage);
        Vue.set(state.pagedListRequestLogs, 'sortBy', temp.sortBy);
        Vue.set(state.pagedListRequestLogs, 'sortDesc', temp.sortDesc);
        Vue.set(state.pagedListRequestLogs, 'filters', [
            {
                fieldName: 'level',
                existsValues: state.filtersLogs.level.toServer()
            },
            {
                fieldName: 'timestamp',
                period: state.filtersLogs.timestamp.isDefault() ? null : state.filtersLogs.timestamp.toServer()
            },
        ]);
    },

    setFilterValuesLogs(state, filterPresets: LogsValues) {
        state.filterPresetsLogs = filterPresets;

        if (filterPresets.levels.length > 0)
            state.filtersLogs.level.Values = filterPresets.levels;
        else
            state.filtersLogs.level.Values = EnumValues.getNames(LevelEnum);

    },

    changeCurrentPageLog(state, value: number) {
        state.pagedListRequestLogs.currentPage = value;
    },

    changePerPageLog(state, value: number) {
        state.pagedListRequestLogs.perPage = value;
    },

    changeSortLog(state, value: { sortBy: string, sortDesc: boolean }) {
        state.pagedListRequestLogs.sortBy = value.sortBy;
        state.pagedListRequestLogs.sortDesc = value.sortDesc;
    },

    setLogs(state, pagedListResponse: PagedListResponseLog) {
        state.pagedListResponseLog = pagedListResponse;
    },

    pagedListMetaDataLogs: state => {
        let ans: PagedListResponseLog = state.pagedListResponseLog as PagedListResponseLog;
        return ans ? ans.metadata : {};
    }

    
};

const actions = {

    getFilterValuesLogs({ dispatch, commit }) {
        return new Promise((resolve, reject) => {
            HTTP.get('Scheduler/GetLogsFilterValues')
                .then((response: AxiosResponse) => {
                    commit('setFilterValuesLogs', response.data as LogsValues);
                    resolve();
                })
                .catch(e => { reject(e); });
        });
    },

    getLogs({ state, dispatch, commit, getters }) {

        commit('loading', true);
        return new Promise((resolve, reject) => {
            HTTP.post(`Scheduler/GetLogsPagedList`, getters.pagedListRequestLogs)
                .then((response: AxiosResponse) => {
                    commit('setLogs', response.data as PagedListResponseLog);
                    commit('loading', false);
                    resolve();
                })
                .catch(e => {
                    commit('loading', false);
                    reject(e);
                });
        });
    },

    doChangeCurrentPageLog({ commit, dispatch }, value: number) {
        commit('changeCurrentPageLog', value);
        return dispatch('getLogs');
    },

    doChangePerPageLog({ commit, dispatch }, value: number) {
        commit('changePerPageLog', value);
        return dispatch('getLogs');
    },

    doChangeSortLog({ commit, dispatch }, value: { sortBy: string, sertDesc: boolean }) {
        commit('changeSortLog', value);
        return dispatch('getLogs');
    },

    doResetAllLogsFilters({ state, commit, dispatch }) {
        _.forEach(state.filtersLogs, (value: IFilter, key: string) => {
            commit('resetFilterLogs', key);
        });
        return dispatch('getLogs');
    },

};

export default {
    state,
    getters,
    mutations,
    actions
};
