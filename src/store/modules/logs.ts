import { HTTP } from '../../util/http-common';
import { IFilter, FilterFactory, CheckBoxFilter, PagedListReq } from '../../classes/filter';
import { EnumValues } from 'enum-values';
import { EntityStatusEnum, FilterTypeEnum } from '../../enums';

import { PagedListResponseLog } from '../../api/models';

import _ from 'lodash';
import { AxiosResponse } from 'axios';

const state = {



    filterPresets: {
        statuses: []
    },

    filters: {
        status:         FilterFactory.getFilter(FilterTypeEnum.StringList),
    },

    pagedListRequest: new PagedListReq(),
    pagedListResponse: null

};

const getters = {

    pagedListRequestLogs: state => state.pagedListRequest,

    logs: state => {
        let ans: PagedListResponseLog = state.pagedListResponse as PagedListResponseLog;
        return ans ? ans.entities : [];
    },

    pagedListMetaDataLogs: state => {
        let ans: PagedListResponseLog = state.pagedListResponse as PagedListResponseLog;
        return ans ? ans.metadata : {};
    }


};

const mutations = {

    setFilterValuesLogs(state, filterPresets: any) {
    },

    changeSortLog(state, value: { sortBy: string, sortDesc: boolean }) {
        state.pagedListRequest.sortBy = value.sortBy;
        state.pagedListRequest.sortDesc = value.sortDesc;
    },

    setLogs(state, pagedListResponse: PagedListResponseLog) {
        state.pagedListResponse = pagedListResponse;
    },

    pagedListMetaDataLogs: state => {
        let ans: PagedListResponseLog = state.pagedListResponse as PagedListResponseLog;
        return ans ? ans.metadata : {};
    }

    
};

const actions = {

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
