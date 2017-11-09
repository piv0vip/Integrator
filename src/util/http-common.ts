import axios from 'axios';

export const HTTP = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? `/rest/` : `http://localhost:5000/rest/`
    // headers: {
    //    	Authorization: 'Bearer {token}'
    //  	}
});