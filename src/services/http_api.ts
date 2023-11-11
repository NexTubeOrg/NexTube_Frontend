import axios, { AxiosError } from 'axios';
import { getToken } from './tokenService';

const http_api = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
  },
  baseURL: 'https://your-api-base-url.com',
});

http_api.interceptors.response.use(
  (responce) => responce,
  (error: AxiosError) => {
    console.log('catched', error);
    if (error.code == 'ERR_NETWORK') {
      window.location.href = '/auth/signin';
    }
    return Promise.reject(error);
  },
);

export default http_api;
