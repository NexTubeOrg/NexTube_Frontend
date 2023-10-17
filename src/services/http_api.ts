import axios, { AxiosError } from 'axios';
import { APP_CONFIG } from '../env';
import { getToken } from './tokenService';

const http_api = axios.create({
  baseURL: APP_CONFIG.API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
  },
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