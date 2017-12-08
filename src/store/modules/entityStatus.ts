import { HTTP } from '../../util/http-common';
import { AxiosResponse } from 'axios';
import { IFilter, FilterFactory, CheckBoxFilter } from '../../classes/filter';
import { EnumValues } from 'enum-values';
import { EntityStatusEnum, FilterTypeEnum } from '../../enums';

import _ from 'lodash';

const state = {

    filterPresets: {
        statuses: []
    },

    filters: {
        Status:         FilterFactory.getFilter(FilterTypeEnum.StringList),
        EntityType:     FilterFactory.getFilter(FilterTypeEnum.StringList),
        Source:         FilterFactory.getFilter(FilterTypeEnum.StringList),
        Target:         FilterFactory.getFilter(FilterTypeEnum.StringList),
        StatusMessage:  FilterFactory.getFilter(FilterTypeEnum.Multiselect),
        EntityVersion:  FilterFactory.getFilter(FilterTypeEnum.Date)
    }
};

const getters = {

    filterPresets:      state => state.filterPresets,

    filters:            state => state.filters,

    filtersIsDefault:   state => {
        return _.every(state.filters, (value: IFilter) => {
            return value.isDefault();
        });
    }
};

const mutations = {
    
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

    setEntityStatuses(state, filterPresets: any) {
        state.filterPresets = filterPresets;

        if (state.filterPresets.statuses.length > 0)
            state.filters.Status.Values = state.filterPresets.statuses;
        else
            state.filters.Status.Values = EnumValues.getNames(EntityStatusEnum);

        if (state.filterPresets.entityTypes.length > 0)
            state.filters.EntityType.Values = state.filterPresets.entityTypes;

        if (state.filterPresets.sources.length > 0)
            state.filters.Source.Values = state.filterPresets.sources;

        if (state.filterPresets.targets.length > 0)
            state.filters.Target.Values = state.filterPresets.targets;

        if (state.filterPresets.versions.length > 0)
            state.filters.EntityVersion.Values = state.filterPresets.versions;
    },
};

const actions = {

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
};

export default {
    state,
    getters,
    mutations,
    actions
};
