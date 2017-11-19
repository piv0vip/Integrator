import * as Vue from 'vue';
import Vuex from 'vuex';
import { HandlerTypes } from './classes/settings/handlerTypes';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        handlerTypes: HandlerTypes
    },
    actions: {},
    mutations: {},
    getters: {},
    modules: {},
});