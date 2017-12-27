import _ from 'lodash';
import * as signalR from '@aspnet/signalr-client';

const state = {
    connected: false,
    showConsole: false,
    broadcastMessages: []
};

const getters = {
    connected: state => state.connected,
    showConsole: state => state.showConsole,
    broadcastMessages: state => state.broadcastMessages
};

const mutations = {

    connected(state, payLoad: boolean) {
        state.connected = payLoad;
    },

    showConsole(state, payLoad: boolean) {
        state.showConsole = payLoad;
    },

    setBroadcastMessage(state, payLoad: string) {
        state.broadcastMessages.push(payLoad);
        if (state.broadcastMessages.length > 200) _.drop(state.broadcastMessages);
    },
};

const actions = {

    tryToStartHubConnection({ commit, dispatch }) {

        let hubUrl = process.env.NODE_ENV === 'production' ? `/hub` : `http://localhost:8080/hub`;

        let httpConnection = new signalR.HttpConnection(hubUrl);

        let HUB: signalR.HubConnection = new signalR.HubConnection(httpConnection);

        return new Promise((resolve, reject) => {
            HUB.start()
                .then((data) => {

                    HUB.on('Broadcast', (data) => {
                        commit('setBroadcastMessage', data);
                    });

                    HUB.on('DataTask', (data) => {
                        dispatch('updateDataTask', data);
                    });

                    HUB.on('DataTaskGroup', (data) => {
                        dispatch('updateDataTaskGroup', data);
                    });

                    HUB.onclose((data) => {
                        dispatch('tryToStartHubConnection');
                    });

                    commit('connected', true);

                    resolve();
                })
                .catch((error) => {

                    commit('connected', false);

                    setTimeout(() => { dispatch('tryToStartHubConnection'); }, 1000);

                });
        }); 
    },

    connectToHub({ commit, dispatch }) {

        dispatch('tryToStartHubConnection');
    },
};

export default {

    state,

    getters,

    mutations,

    actions
};
