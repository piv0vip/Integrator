import axios from 'axios';
import * as signalR from '@aspnet/signalr-client';

export const HTTP = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? `/rest/` : `http://localhost:5000/rest/`
    // headers: {
    //    	Authorization: 'Bearer {token}'
    //  	}
});

let hubUrl = process.env.NODE_ENV === 'production' ? `/hub` : `http://localhost:5000/hub`;
let httpConnection = new signalR.HttpConnection(hubUrl);

export const HUB: signalR.HubConnection = new signalR.HubConnection(httpConnection);