import axios from 'axios';

import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage';
export const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const protectedApi = axios.create({
  baseURL: 'http://localhost:8000/api',
});

protectedApi.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  if (!accessToken) {
    return request;
  }
  request.headers.Authorization = `Bearer ${accessToken}`;
  return request;
});

protectedApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
    // Verifica se tem um refreshToken
    if (!refreshToken) {
      return Promise.reject(error);
    }
    if (
      // Verifica se o Error é 401 de Token inválido ou inexistente, e garante que só tente fazer a requisição uma vez com o request._retry
      // e garante que a rota seja a /users/refresh-token
      error.response.status === 401 &&
      !request._retry &&
      !request.url.includes('/users/refresh-token')
    ) {
      request._retry = true;
      try {
        const response = await protectedApi.post('/refresh-token', {
          refreshToken,
        });
        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;
        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, newAccessToken);
        localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, newRefreshToken);
        request.headers.Authorization = `Bearer ${newAccessToken}`;
        return protectedApi(request);
      } catch (refreshError) {
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
        localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
        console.error(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
