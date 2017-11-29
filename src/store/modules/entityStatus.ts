import { HTTP } from '../../util/http-common';
import { AxiosResponse } from 'axios';
import { EntityStatatusFilters } from '../../classes/filter';

const state = {
    entityStatuses: {
        statuses: []
    },
};

const getters = {
    filterPresets: state => state.entityStatuses
};

const mutations = {
    setEntityStatuses(state, statuses: any) {
        state.entityStatuses = statuses;
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
