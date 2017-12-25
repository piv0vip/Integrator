import Vue from 'vue';
import Vuex from 'vuex';
// import * as actions from './actions'
import getters from './getters';
import dataTask from './modules/dataTask';
import entityStatus from './modules/entityStatus';
import signalR from './modules/signalR';
import log from './modules/logs';
import auth from './modules/auth';
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({

    // actions,

    state: {
        loading: false,
        pending: false
    },

    getters,

    mutations: {

        loading(state, payLoad: boolean) {
            state.loading = payLoad;
        },

        pending(state, payLoad: boolean) {
            state.pending = payLoad;
        }
    },

    modules: {
        dataTask,
        entityStatus,
        signalR,
        log,
        auth
    },

    strict: debug,
    //    plugins: debug ? [createLogger()] : []
});