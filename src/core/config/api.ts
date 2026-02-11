import axios, { AxiosError, type AxiosInstance } from 'axios';

import { SingleFlight, tokenStorage } from '@/core/utils';
import type { AuthResponse, AuthRequestRefresh } from '@/core/types';

const api: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_ORIGIN}`,
  withCredentials: false,
});

let accessToken: string | null = tokenStorage.get().accessToken;
let refreshToken: string | null = tokenStorage.get().refreshToken;

const refresher = new SingleFlight<AuthResponse>();

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config!;
    const status = error.response?.status;

    if (status === 401 && refreshToken && !original.headers?.['x-retried']) {
      try {
        const refreshed = await refresher.do(async () => {
          const payload: AuthRequestRefresh = { refreshToken: refreshToken! };
          const { data } = await api.post<AuthResponse>('auth/refresh', payload);
          accessToken = data.accessToken;
          refreshToken = data.refreshToken;
          tokenStorage.set({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            email: data.email,
            userId: data.userId,
          });
          return data;
        });

        original.headers = original.headers ?? {};
        (original.headers as any)['Authorization'] = `Bearer ${refreshed.accessToken}`;
        (original.headers as any)['x-retried'] = '1';

        return api.request(original);
      } catch {
        tokenStorage.clear();
        accessToken = null;
        refreshToken = null;
      }
    }

    return Promise.reject(error);
  }
);

export const http = {
  client: api,
  setTokens(tokens: { accessToken: string; refreshToken: string }) {
    accessToken = tokens.accessToken;
    refreshToken = tokens.refreshToken;
  },
  clearTokens() {
    accessToken = null;
    refreshToken = null;
  },
};
