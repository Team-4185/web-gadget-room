import { api } from '@/core/config';
import type { ApiPhone } from '@/core/types';

export const favoritesService = {
  async getFavorites(signal?: AbortSignal) {
    const { data } = await api.get<ApiPhone[]>('/api/v1/me/favorites', { signal });
    return data;
  },
  async addFavorite(phoneId: number) {
    const { data } = await api.post<ApiPhone[]>(`/api/v1/me/favorites/${phoneId}`);
    return data;
  },
  async removeFavorite(phoneId: number) {
    const { data } = await api.delete<ApiPhone[]>(`/api/v1/me/favorites/${phoneId}`);
    return data;
  },
};
