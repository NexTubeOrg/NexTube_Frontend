import axios from 'axios';
import { APP_CONFIG } from '../env';

const http_api = axios.create({
  baseURL: APP_CONFIG.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default http_api;
