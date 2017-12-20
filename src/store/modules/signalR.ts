import { HUB } from '../../util/http-common';
import _ from 'lodash';

const state = {

    broadcastMessages: []
};

const getters = {

    broadcastMessages: state => state.broadcastMessages
};

const mutations = {

    setBroadcastMessage(state, payLoad: string) {
        state.broadcastMessages.push(payLoad);
        if (state.broadcastMessages.length > 200) _.drop(state.broadcastMessages);
    },
};

const actions = {

    connectToHub({ commit, dispatch }) {

        HUB.on('Broadcast', (data) => {
            commit('setBroadcastMessage', data);
        });

        HUB.on('DataTask', (data) => {
            dispatch('getSilentDataTasks');
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
