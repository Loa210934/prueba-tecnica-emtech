import { config } from '@/config/config';
import axios from 'axios';

const api = axios.create({
  baseURL: config.baseUrl,
  timeout: 10000,
});

api.interceptors.request.use(
  request => {
    const token = localStorage.getItem('token');
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);

export default api;
