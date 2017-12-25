import { HTTP } from '../../util/http-common';
import { IFilter, FilterFactory, CheckBoxFilter, PagedListReq } from '../../classes/filter';
import { EnumValues } from 'enum-values';
import { EntityStatusEnum, FilterTypeEnum } from '../../enums';

import { PagedListResponseLog } from '../../api/models';

import _ from 'lodash';
import { AxiosResponse } from "axios";

const state = {



    filterPresets: {
        //statuses: []
    },

    filters: {
        status:         FilterFactory.getFilter(FilterTypeEnum.StringList),
        //EntityType:     FilterFactory.getFilter(FilterTypeEnum.StringList),
        //Source:         FilterFactory.getFilter(FilterTypeEnum.StringList),
        //Target:         FilterFactory.getFilter(FilterTypeEnum.StringList),
        //StatusMessage:  FilterFactory.getFilter(FilterTypeEnum.Multiselect),
        //EntityVersion:  FilterFactory.getFilter(FilterTypeEnum.Date)
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


    //filterPresets:      state => state.filterPresets,

    //filters:            state => state.filters,

    //filtersIsDefault:   state => {
    //    return _.every(state.filters, (value: IFilter) => {
    //        return value.isDefault();
    //    });
    //}
};

const mutations = {

    //updateFilterValue(state, values: { filterName: string, values: any }) {
    //    state.filters[values.filterName].FilterData = values.values;
    //},

    //resetFilter(state, values: { filterName: string, values: any }) {
    //    state.filters[values.filterName].reset();
    //},

    //resetAllFilters(state) {
    //    _.forEach(state.filters, (value: IFilter) => {
    //        value.reset();
    //    });
    //},

    setFilterValuesLogs(state, filterPresets: any) {
    //    state.filterPresets = filterPresets;

    //    if (state.filterPresets.statuses.length > 0)
    //        state.filters.Status.Values = state.filterPresets.statuses;
    //    else
    //        state.filters.Status.Values = EnumValues.getNames(EntityStatusEnum);

    //    if (state.filterPresets.entityTypes.length > 0)
    //        state.filters.EntityType.Values = state.filterPresets.entityTypes;

    //    if (state.filterPresets.sources.length > 0)
    //        state.filters.Source.Values = state.filterPresets.sources;

    //    if (state.filterPresets.targets.length > 0)
    //        state.filters.Target.Values = state.filterPresets.targets;

    //    if (state.filterPresets.versions.length > 0)
    //        state.filters.EntityVersion.Values = state.filterPresets.versions;
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
        })
    },

    doChangeSortLog({ commit, dispatch }, value: { sortBy: string, sertDesc: boolean }) {
        commit('changeSortLog', value)
        return dispatch('getLogs');
    },


};

export default {
    state,
    getters,
    mutations,
    actions
};
