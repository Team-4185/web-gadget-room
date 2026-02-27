import { endpoints } from '@/core/config';
import { baseInstance } from '@/core/services/instances/baseInstance';
import type { ApiPhone } from '@/core/types';

export const phonesService = {
  async getById(id: number) {
    const { data } = await baseInstance.get<ApiPhone>(`${endpoints.phones}/${id}`);
    return data;
  },
};
