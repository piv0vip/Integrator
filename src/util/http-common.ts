import axios from 'axios';
import * as signalR from '@aspnet/signalr-client';

import { IntegratorAPI } from '../api/integratorAPI'

var baseUri = process.env.NODE_ENV === 'production' ? `/` : `http://localhost:8080/`;
const API = new IntegratorAPI(baseUri);


const HTTP = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? `/rest/` : `http://localhost:8080/rest/`,

    // headers: {
    //    	Authorization: 'Bearer {token}'
    //  	}
});

HTTP.interceptors.response.use(undefined, error => {
    let originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) { // if the error is 401 and hasent already been retried
        originalRequest._retry = true;
        let redirectURL = `${location.protocol}//${location.host}${location.port}/account/authorize`;
        console.log('redirect to: ' + redirectURL);
        location.href = redirectURL;
    }
    return Promise.reject(error);
});

let hubUrl = process.env.NODE_ENV === 'production' ? `/hub` : `http://localhost:8080/hub`;
let httpConnection = new signalR.HttpConnection(hubUrl);

const HUB: signalR.HubConnection = new signalR.HubConnection(httpConnection);

export {
    HTTP, HUB, API
} 