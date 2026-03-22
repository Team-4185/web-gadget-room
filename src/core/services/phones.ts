import { api } from '@/core/config';
import type { ApiPhone } from '@/core/types';

export const phonesService = {
  async getById(id: number) {
    const { data } = await api.get<ApiPhone>(`/api/v1/phones/${id}`);
    return data;
  },
};
