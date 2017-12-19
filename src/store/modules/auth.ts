import { HTTP } from '../../util/http-common';

import _ from 'lodash';

const state = {
    productVersion: '',
    isAuthenticate: false
};

const getters = {
    isAuthenticate: state => state.isAuthenticate,
    productVersion: state => state.productVersion
};

const mutations = {
    productVersion(state, version: string) {
        state.productVersion = version;
    },
};

const actions = {
    getProductVersion({ commit }) {
        return new Promise((resolve, reject) => {
            HTTP.get('Scheduler/GetProductVersion')
                .then((response) => {
                    commit('productVersion', response.data as string);
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
