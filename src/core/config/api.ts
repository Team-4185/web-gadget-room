import axios, { AxiosError, isAxiosError, type InternalAxiosRequestConfig } from 'axios';

import { authService } from '@/core/services';
import { tokenStorage } from '@/core/utils/tokenStorage';

interface IСustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _isRetry?: boolean;
}

const options = {
  baseURL: `${import.meta.env.VITE_BACKEND_ORIGIN}`,
  withCredentials: true,
};

export const apiAuth = axios.create(options);

export const api = axios.create(options);

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as IСustomInternalAxiosRequestConfig;

    if (
      isAxiosError(error) &&
      error.response?.status === 401 &&
      tokenStorage.hasSession() &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        const res = await authService.refreshToken();

        const newAccessToken = res.accessToken;
        setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api.request(originalRequest);
      } catch (e) {
        console.log('Logout');
        setAccessToken(null);
        tokenStorage.clearSession();

        throw e;
      }
    }

    throw error;
  }
);
