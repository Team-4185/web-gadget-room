import axios, { AxiosError, isAxiosError, type InternalAxiosRequestConfig } from 'axios';

import { authService } from '@/core/services';
import type { IJwtResponseDto } from '@/core/types';
import { tokenStorage } from '@/core/utils/tokenStorage';

interface IСustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _isRetry?: boolean;
}

const options = {
  baseURL: `${import.meta.env.VITE_BACKEND_ORIGIN}`,
  withCredentials: true,
};

const PUBLIC_ENDPOINT_PREFIXES = ['/api/v1/phones', '/api/v1/filter', '/api/v1/images'];

export const apiAuth = axios.create(options);

export const api = axios.create(options);

let accessToken: string | null = null;
let refreshPromise: Promise<IJwtResponseDto> | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const hasAccessToken = () => Boolean(accessToken);

export const refreshAuthSession = async () => {
  if (!tokenStorage.hasSession()) {
    throw new Error('No auth session');
  }

  if (!refreshPromise) {
    refreshPromise = authService
      .refreshToken()
      .then((response) => {
        setAccessToken(response.accessToken);
        tokenStorage.markSession();
        return response;
      })
      .catch((error) => {
        setAccessToken(null);
        tokenStorage.clearSession();
        throw error;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

const getRequestPath = (url?: string) => {
  if (!url) return '';

  try {
    return new URL(url, options.baseURL).pathname;
  } catch {
    return url;
  }
};

const isPublicEndpoint = (url?: string) => {
  const path = getRequestPath(url);
  return PUBLIC_ENDPOINT_PREFIXES.some((prefix) => path.startsWith(prefix));
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
      !originalRequest._isRetry &&
      !isPublicEndpoint(originalRequest.url)
    ) {
      originalRequest._isRetry = true;

      try {
        const res = await refreshAuthSession();

        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${res.accessToken}`;

        return api.request(originalRequest);
      } catch (e) {
        throw e;
      }
    }

    throw error;
  }
);
