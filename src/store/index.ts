import Vue from 'vue';
import Vuex from 'vuex';
// import * as actions from './actions'
import getters from './getters';
import dataTask from './modules/dataTask';
import entityStatus from './modules/entityStatus';
import documentTransfer from './modules/documentTransfers';
import signalR from './modules/signalR';
import log from './modules/logs';
import auth from './modules/auth';
import { router } from '../main';
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({

    actions: {  
        refreshCurrentList({ dispatch }) {
            switch (router.app.$route.name) {
                case 'dataTasks':
                    dispatch('getDataTasks');
                    break;
                case 'entityStatuses':
                    dispatch('getEntityStatuses');
                    break;
                case 'documentTransfers':
                    dispatch('getDTs');
                    break;
                case 'logs':
                    dispatch('getLogs');
                    break;
            }
        }
    },

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
        documentTransfer,
        signalR,
        log,
        auth
    },

    strict: debug,
    //    plugins: debug ? [createLogger()] : []
});