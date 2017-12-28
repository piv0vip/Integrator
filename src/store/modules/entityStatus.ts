import Vue from 'vue';
import { HTTP } from '../../util/http-common';
import { AxiosResponse } from 'axios';
import { IFilter, FilterFactory, CheckBoxFilter, PagedListReq } from '../../classes/filter';
import { EnumValues } from 'enum-values';
import { EntityStatusEnum, FilterTypeEnum } from '../../enums';

import { PagedListResponseEntityStatus, EntityStatusesValues } from '../../api/models';

import { IPagedListReq } from '../../interfaces';

import _ from 'lodash';

const state = function(){
    return {


        filterPresets: {
            statuses: []
        },

        filters: {
            status: FilterFactory.getFilter(FilterTypeEnum.StringList),
            entityType: FilterFactory.getFilter(FilterTypeEnum.StringList),
            source: FilterFactory.getFilter(FilterTypeEnum.StringList),
            target: FilterFactory.getFilter(FilterTypeEnum.StringList),
            statusMessage: FilterFactory.getFilter(FilterTypeEnum.Multiselect),
            entityVersion: FilterFactory.getFilter(FilterTypeEnum.Period)
        },

        pagedListRequest: new PagedListReq(),
        pagedListResponse: null
    }
};

const getters = {

    pagedListRequest: state => state.pagedListRequest,

    filterPresets:      state => state.filterPresets,

    filters:            state => state.filters,

    filtersIsDefault:   state => {
        return _.every(state.filters, (value: IFilter) => {
            return value.isDefault();
        });
    },

    entityStatuses: state => {
        let ans: PagedListResponseEntityStatus = state.pagedListResponse as PagedListResponseEntityStatus;
        return ans ? ans.entities : [] ; 
    },

    pagedListMetaDataEntityStatus: state => {
        let ans: PagedListResponseEntityStatus = state.pagedListResponse as PagedListResponseEntityStatus;
        return ans ? ans.metadata : {} ;
    }
};

const mutations = {

    changeCurrentPage(state, value: number) {
        state.pagedListRequest.currentPage = value;
    },

    changePerPage(state, value: number) {
        state.pagedListRequest.perPage = value;
    },

    changeSort(state, value: { sortBy: string, sortDesc: boolean }) {
        state.pagedListRequest.sortBy = value.sortBy;
        state.pagedListRequest.sortDesc = value.sortDesc;
    },

    updateFilterValue(state, values: { filterName: string, values: any }) {
        Vue.set(state.filters[values.filterName], 'FilterData', values.values);
        let temp: PagedListReq = state.pagedListRequest;
        Vue.set(state.pagedListRequest, 'currentPage', temp.currentPage);
        Vue.set(state.pagedListRequest, 'perPage', temp.perPage);
        Vue.set(state.pagedListRequest, 'sortBy', temp.sortBy);
        Vue.set(state.pagedListRequest, 'sortDesc', temp.sortDesc);
        Vue.set(state.pagedListRequest, 'filters', [
            {
                fieldName: 'status',
                existsValues: state.filters.status.toServer()
            },
            {
                fieldName: 'entityType',
                existsValues: state.filters.entityType.toServer()
            },
            {
                fieldName: 'source',
                existsValues: state.filters.source.toServer()
            },
            {
                fieldName: 'target',
                existsValues: state.filters.target.toServer()
            },
            {
                fieldName: 'statusMessage',
                ignoredValues: state.filters.statusMessage.isDefault() ? null : state.filters.statusMessage.toServer()
            },
            {
                fieldName: 'entityVersion',
                period: state.filters.entityVersion.isDefault() ? null : state.filters.entityVersion.toServer()
            },
        ]);
    },

    resetFilter(state, filterName: string) {
        state.filters[filterName].reset();
        let temp: PagedListReq = state.pagedListRequest;
        Vue.set(state.pagedListRequest, 'currentPage', temp.currentPage);
        Vue.set(state.pagedListRequest, 'perPage', temp.perPage);
        Vue.set(state.pagedListRequest, 'sortBy', temp.sortBy);
        Vue.set(state.pagedListRequest, 'sortDesc', temp.sortDesc);
        Vue.set(state.pagedListRequest, 'filters', [
            {
                fieldName: 'status',
                existsValues: state.filters.status.toServer()
            },
            {
                fieldName: 'entityType',
                existsValues: state.filters.entityType.toServer()
            },
            {
                fieldName: 'source',
                existsValues: state.filters.source.toServer()
            },
            {
                fieldName: 'target',
                existsValues: state.filters.target.toServer()
            },
            {
                fieldName: 'statusMessage',
                ignoredValues: state.filters.statusMessage.isDefault() ? null : state.filters.statusMessage.toServer()
            },
            {
                fieldName: 'entityVersion',
                period: state.filters.entityVersion.isDefault() ? null : state.filters.entityVersion.toServer()
            },
        ]);
    },

    setFilterValues(state, filterPresets: EntityStatusesValues) {
        state.filterPresets = filterPresets;

        if (state.filterPresets.statuses.length > 0)
            state.filters.status.Values = filterPresets.statuses;
        else
            state.filters.status.Values = EnumValues.getNames(EntityStatusEnum);

        if (state.filterPresets.entityTypes.length > 0)
            state.filters.entityType.Values = filterPresets.entityTypes;

        if (state.filterPresets.sources.length > 0)
            state.filters.source.Values = filterPresets.sources;

        if (state.filterPresets.targets.length > 0)
            state.filters.target.Values = filterPresets.targets;

        if (state.filterPresets.versions.length > 0)
            state.filters.entityVersion.Values = filterPresets.versions;
    },

    setEntityStatuses(state, pagedListResponse: PagedListResponseEntityStatus) {
        state.pagedListResponse = pagedListResponse;
    }

};

const actions = {

    getFilterValues({ dispatch, commit }) {
        return new Promise((resolve, reject) => {
            HTTP.get('EntityStatus/GetFilterValues')
                .then((response: AxiosResponse) => {
                    commit('setFilterValues', response.data as EntityStatusesValues);
                    resolve();
                })
                .catch(e => { reject(e); });
        });
    },

    getEntityStatuses({ state, dispatch, commit, getters }) {

        commit('loading', true);
        return new Promise((resolve, reject) => {
            HTTP.post(`EntityStatus/GetEntityStatusShort`, getters.pagedListRequest)
                .then((response: AxiosResponse) => {
                    commit('setEntityStatuses', response.data as PagedListResponseEntityStatus);
                    commit('loading', false);
                    resolve();
                })
                .catch(e => {
                    commit('loading', false);
                    reject(e);
                });
        });
    },

    doChangeCurrentPage({ commit, dispatch }, value: number) {
        commit('changeCurrentPage', value);
        return dispatch('getEntityStatuses');
    },

    doChangePerPage({ commit, dispatch }, value: number) {
        commit('changePerPage', value);
        return dispatch('getEntityStatuses');
    },

    doChangeSort({ commit, dispatch }, value: {sortBy: string, sertDesc: boolean}) {
        commit('changeSort', value);
        return dispatch('getEntityStatuses');
    },

    doResetAllFilters({ state, commit, dispatch }) {
        _.forEach(state.filters, (value: IFilter, key: string) => {
            commit('resetFilter', key);
        });
        return dispatch('getEntityStatuses');
    },


};

export default {
    state,
    getters,
    mutations,
    actions
};
