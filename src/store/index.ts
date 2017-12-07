import Vue from 'vue';
import Vuex from 'vuex';
// import * as actions from './actions'
// import * as getters from './getters';
import dataTask from './modules/dataTask';
import entityStatus from './modules/entityStatus';
import signalR from './modules/signalR';
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    // actions,
    state: {
        loading: false
    },
    getters: {
        loading: state => {
            return state.loading;
        }
    },
    mutations: {
        loading(state, payLoad: boolean) {
            state.loading = payLoad;
        }
    },
    modules: {
        dataTask,
        entityStatus,
        signalR
    },
    strict: debug,
    //    plugins: debug ? [createLogger()] : []
});