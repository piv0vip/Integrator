import { HTTP } from '../../util/http-common';
import { AxiosResponse } from 'axios';
import { CheckBoxFilter } from '../../classes/filter';
import { EnumValues } from 'enum-values';
import { EntityStatusEnum } from '../../enums';

const state = {
    filterPresets: {
        statuses: []
    },
    filters: {
        Status: new CheckBoxFilter(EnumValues.getNames(EntityStatusEnum))
    }
};

const getters = {
    filterPresets: state => state.filterPresets,
    filters: state => state.filters
};

const mutations = {
    setEntityStatuses(state, filterPresets: any) {
        state.filterPresets = filterPresets;
        if (state.filterPresets.statuses.length > 0)
            state.filters.Status.Values = state.filterPresets.statuses;
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
