import Vue from 'vue';
import { HTTP } from '../../util/http-common';
import { IFilter, FilterFactory, CheckBoxFilter, PagedListReq } from '../../classes/filter';
import { EnumValues } from 'enum-values';
import { EntityStatusEnum, FilterTypeEnum } from '../../enums';

import { PagedListResponseDocumentTransfer, DocumentTransferValues, Status1 as DTStatusEnum } from '../../api/models';

import _ from 'lodash';
import { AxiosResponse } from 'axios';

const state = function () {
    return {

        filterPresetsDTs: {
            statuses: [],
        },

        filtersDTs: {
            status: FilterFactory.getFilter(FilterTypeEnum.StringList),
            documentType: FilterFactory.getFilter(FilterTypeEnum.StringList),
            source: FilterFactory.getFilter(FilterTypeEnum.StringList),
            target: FilterFactory.getFilter(FilterTypeEnum.StringList),
        },

        pagedListRequestDTs: new PagedListReq(),
        pagedListResponseDT: null

    };
}; 

const getters = {

    filterPresetsDTs: state => state.filterPresetsDTs,

    filtersDTs: state => state.filtersDTs,

    filtersDTsIsDefault: state => {
        return _.every(state.filtersDTs, (value: IFilter) => {
            return value.isDefault();
        });
    },

    pagedListRequestDTs: state => state.pagedListRequestDTs,

    documentTransfers: state => {
        let ans: PagedListResponseDocumentTransfer = state.pagedListResponseDT as PagedListResponseDocumentTransfer;
        return ans ? ans.entities : [];
    },

    pagedListMetaDataDTs: state => {
        let ans: PagedListResponseDocumentTransfer = state.pagedListResponseDT as PagedListResponseDocumentTransfer;
        return ans ? ans.metadata : {};
    }

};

const mutations = {

    updatePagedListDTs(state) {
        let temp: PagedListReq = state.pagedListRequestDTs;
        Vue.set(state.pagedListRequestDTs, 'currentPage', temp.currentPage);
        Vue.set(state.pagedListRequestDTs, 'perPage', temp.perPage);
        Vue.set(state.pagedListRequestDTs, 'sortBy', temp.sortBy);
        Vue.set(state.pagedListRequestDTs, 'sortDesc', temp.sortDesc);
        Vue.set(state.pagedListRequestDTs, 'filters', [
            {
                fieldName: 'status',
                existsValues: state.filtersDTs.status.toServer()
            },
            {
                fieldName: 'documentType',
                existsValues: state.filtersDTs.documentType.toServer()
            },
            {
                fieldName: 'source',
                existsValues: state.filtersDTs.source.toServer()
            },
            {
                fieldName: 'target',
                existsValues: state.filtersDTs.target.toServer()
            },
        ]);
    },

    updateFilterDTsValue(state, values: { filterName: string, values: any }) {
        Vue.set(state.filtersDTs[values.filterName], 'FilterData', values.values);
    },

    resetFilterDTs(state, filterName: string) {
        state.filtersDTs[filterName].reset();
    },

    setFilterValuesDTs(state, filterPresets: DocumentTransferValues) {
        state.filterPresetsDTs = filterPresets;

        if (state.filterPresetsDTs.statuses.length > 0)
            state.filtersDTs.status.Values = filterPresets.statuses;
        else
            state.filtersDTs.status.Values = EnumValues.getNames(DTStatusEnum);

        if (state.filterPresetsDTs.documentTypes.length > 0)
            state.filtersDTs.documentType.Values = filterPresets.documentTypes;

        if (state.filterPresetsDTs.sources.length > 0)
            state.filtersDTs.source.Values = filterPresets.sources;

        if (state.filterPresetsDTs.targets.length > 0)
            state.filtersDTs.target.Values = filterPresets.targets;


    },

    changeCurrentPageDT(state, value: number) {
        state.pagedListRequestDTs.currentPage = value;
    },

    changePerPageDT(state, value: number) {
        state.pagedListRequestDTs.perPage = value;
    },

    changeSortDT(state, value: { sortBy: string, sortDesc: boolean }) {
        state.pagedListRequestDTs.sortBy = value.sortBy;
        state.pagedListRequestDTs.sortDesc = value.sortDesc;
    },

    setDTs(state, pagedListResponse: PagedListResponseDocumentTransfer) {
        state.pagedListResponseDT = pagedListResponse;
    },

    pagedListMetaDataDTs: state => {
        let ans: PagedListResponseDocumentTransfer = state.pagedListResponseDT as PagedListResponseDocumentTransfer;
        return ans ? ans.metadata : {};
    }

    
};

const actions = {

    updateFilterDTsValue({ commit }, value: { filterName: string, values: any }) {
        commit('updateFilterDTsValue', value);
        commit('updatePagedListDTs');
    },

    resetFilterDTs({ commit }, filterName: string) {
        commit('resetFilterDTs', filterName);
        commit('updatePagedListDTs');
    },

    getFilterValuesDTs({ dispatch, commit }) {
        return new Promise((resolve, reject) => {
            HTTP.get('DocumentTransfer/GetFilterValues')
                .then((response: AxiosResponse) => {
                    commit('setFilterValuesDTs', response.data as DocumentTransferValues);
                    resolve();
                })
                .catch(e => { reject(e); });
        });
    },

    getDTs({ state, dispatch, commit, getters }) {

        commit('loading', true);
        return new Promise((resolve, reject) => {
            HTTP.post(`DocumentTransfer/GetDocumentTransferShort`, getters.pagedListRequestDTs)
                .then((response: AxiosResponse) => {
                    commit('setDTs', response.data as PagedListResponseDocumentTransfer);
                    commit('loading', false);
                    resolve();
                })
                .catch(e => {
                    commit('loading', false);
                    reject(e);
                });
        });
    },

    doChangeCurrentPageDT({ commit, dispatch }, value: number) {
        commit('changeCurrentPageDT', value);
        return dispatch('getDTs');
    },

    doChangePerPageDT({ commit, dispatch }, value: number) {
        commit('changePerPageDT', value);
        return dispatch('getDTs');
    },

    doChangeSortDT({ commit, dispatch }, value: { sortBy: string, sertDesc: boolean }) {
        commit('changeSortDT', value);
        return dispatch('getDTs');
    },

    doResetAllDTsFilters(context) {
        _.forEach(context.state.filtersDTs, (value: IFilter, key: string) => {
            context.dispatch('resetFilterDTs', key);
        });
        return context.dispatch('getDTs');
    },

};

export default {
    state,
    getters,
    mutations,
    actions
};
