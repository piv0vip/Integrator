import Vue from 'vue';
import Vuex from 'vuex';
// import * as actions from './actions'
// import * as getters from './getters'
import dataTask from './modules/dataTask';
import entityStatus from './modules/entityStatus';
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    // actions,
    // getters,
    modules: {
        dataTask,
        entityStatus
    },
    strict: debug,
    //    plugins: debug ? [createLogger()] : []
});