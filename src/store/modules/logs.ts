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
        },

        pagedListRequestLogs: new PagedListReq({ sortBy: 'timestamp' }),
        pagedListResponseLog: null

    };
}; 

const getters = {

    filterPresetsLogs: state => state.filterPresetsLogs,

    filtersLogs: state => state.filtersLogs,

    filtersLogsIsDefault: state => {
        return _.every(state.filters, (value: IFilter) => {
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

    setFilterValuesLogs(state, filterPresets: LogsValues) {
        state.filterPresetsLogs = filterPresets;

        if (filterPresets.levels.length > 0)
            state.filtersLogs.level.Values = filterPresets.levels;
        else
            state.filtersLogs.level.Values = EnumValues.getNames(LevelEnum);

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

    doChangeSortLog({ commit, dispatch }, value: { sortBy: string, sertDesc: boolean }) {
        commit('changeSortLog', value);
        return dispatch('getLogs');
    },


};

export default {
    state,
    getters,
    mutations,
    actions
};
