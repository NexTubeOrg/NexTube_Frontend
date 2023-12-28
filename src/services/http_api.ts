import axios, { AxiosError } from 'axios';
import { getToken } from './tokenService';

const http_api = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
  },
});

export default http_api;
