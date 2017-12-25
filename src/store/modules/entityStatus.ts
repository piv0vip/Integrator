import { HTTP } from '../../util/http-common';
import { AxiosResponse } from 'axios';
import { IFilter, FilterFactory, CheckBoxFilter, PagedListReq } from '../../classes/filter';
import { EnumValues } from 'enum-values';
import { EntityStatusEnum, FilterTypeEnum } from '../../enums';

import { PagedListAnsEntityStatus } from '../../api/models';

import { IPagedListReq } from '../../interfaces';

import _ from 'lodash';

const state = {

    ctx: new PagedListReq(),

    filterPresets: {
        statuses: []
    },

    filters: {
        status:         FilterFactory.getFilter(FilterTypeEnum.StringList),
        entityType:     FilterFactory.getFilter(FilterTypeEnum.StringList),
        source:         FilterFactory.getFilter(FilterTypeEnum.StringList),
        target:         FilterFactory.getFilter(FilterTypeEnum.StringList),
        statusMessage:  FilterFactory.getFilter(FilterTypeEnum.Multiselect),
        entityVersion:  FilterFactory.getFilter(FilterTypeEnum.Date)
    },

    pagedListAnswer: null
};

const getters = {

    getFilters:         state => {
        return [
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
        ]
    },

    filterPresets:      state => state.filterPresets,

    filters:            state => state.filters,

    filtersIsDefault:   state => {
        return _.every(state.filters, (value: IFilter) => {
            return value.isDefault();
        });
    },

    entityStatuses: state => {
        let ans: PagedListAnsEntityStatus = state.pagedListAnswer as PagedListAnsEntityStatus;
        return ans ? ans.entities : [] ; 
    },

    pagedListMetaData: state => {
        let ans: PagedListAnsEntityStatus = state.pagedListAnswer as PagedListAnsEntityStatus;
        return ans.metadata;
    }
};

const mutations = {

    changeCurrentPage(state, value: number) {
        state.ctx.currentPage = value;
    },

    changePerPage(state, value: number) {
        state.ctx.perPage = value;
    },

    updateFilterValue(state, values: { filterName: string, values: any }) {
        state.filters[values.filterName].FilterData = values.values;
    },

    resetFilter(state, values: { filterName: string, values: any }) {
        state.filters[values.filterName].reset();
    },

    resetAllFilters(state) {
        _.forEach(state.filters, (value: IFilter) => {
            value.reset();
        });
    },

    setFilterValues(state, filterPresets: any) {
        state.filterPresets = filterPresets;

        if (state.filterPresets.statuses.length > 0)
            state.filters.status.Values = state.filterPresets.statuses;
        else
            state.filters.status.Values = EnumValues.getNames(EntityStatusEnum);

        if (state.filterPresets.entityTypes.length > 0)
            state.filters.entityType.Values = state.filterPresets.entityTypes;

        if (state.filterPresets.sources.length > 0)
            state.filters.source.Values = state.filterPresets.sources;

        if (state.filterPresets.targets.length > 0)
            state.filters.target.Values = state.filterPresets.targets;

        if (state.filterPresets.versions.length > 0)
            state.filters.entityVersion.Values = state.filterPresets.versions;
    },

    setEntityStatuses(state, pagedListAnswer: PagedListAnsEntityStatus) {
        state.pagedListAnswer = pagedListAnswer;
    }

};

const actions = {

    getFilterValues({ dispatch, commit }) {
        return new Promise((resolve, reject) => {
            HTTP.get('EntityStatus/GetFilterValues')
                .then((response: AxiosResponse) => {
                    commit('setFilterValues', response.data);
                    resolve();
                })
                .catch(e => { reject(e); });
        });
    },

    getEntityStatuses({ state, dispatch, commit, getters }) {
        let ctx: IPagedListReq = state.ctx;
        commit('loading', true);
        return new Promise((resolve, reject) => {
            HTTP.post(`EntityStatus/GetEntityStatusShort?pageSize=${ctx.perPage}&pageNumber=${ctx.currentPage}&sortBy=${ctx.sortBy}&sortDesc=${ctx.sortDesc}`, getters.getFilters) 
                .then((response: AxiosResponse) => {
                    commit('setEntityStatuses', response.data as PagedListAnsEntityStatus);
                    commit('loading', false);
                    resolve();
                })
                .catch(e => {
                    commit('loading', false);
                    reject(e);
                });
        })
    },

    doChangeCurrentPage({ commit, dispatch }, value: number) {
        commit('changeCurrentPage', value)
        return dispatch('getEntityStatuses');
    },

    doChangePerPage({ commit, dispatch }, value: number) {
        commit('changePerPage', value)
        return dispatch('getEntityStatuses');
    },

};

export default {
    state,
    getters,
    mutations,
    actions
};
