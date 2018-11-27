import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3002';
export const request = options => axios(options).then(res => res.data);
