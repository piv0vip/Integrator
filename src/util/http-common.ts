import axios from 'axios';

const HTTP = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? `/rest/` : `http://localhost:8080/rest/`,
});

HTTP.interceptors.response.use(undefined, error => {
    let originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) { // if the error is 401 and hasent already been retried
        originalRequest._retry = true;
        let redirectURL = `${location.protocol}//${location.host}/account/authorize`;
        console.log('redirect to: ' + redirectURL);
        location.href = redirectURL;
    }
    return Promise.reject(error);
});

export {
    HTTP
} 