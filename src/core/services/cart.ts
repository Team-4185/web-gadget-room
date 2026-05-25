import { isAxiosError } from 'axios';

import { api } from '@/core/config';
import type { ICartDto } from '@/core/types';

type MutateCartBody = {
  phoneId: number;
  amount: number;
};

const mutateCart = async (url: string, payload: MutateCartBody) => {
  try {
    const { data } = await api.post<ICartDto>(url, payload);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 405) {
      const { data } = await api.put<ICartDto>(url, payload);
      return data;
    }

    throw error;
  }
};

export const cartService = {
  async getCart() {
    const { data } = await api.get<ICartDto>('/api/v1/me/cart');
    return data;
  },
  async putItem(payload: MutateCartBody) {
    return mutateCart('/api/v1/me/cart/put', payload);
  },
  async removeItem(payload: MutateCartBody) {
    return mutateCart('/api/v1/me/cart/remove', payload);
  },
  async clearCart() {
    await api.post<void>('/api/v1/me/cart/clear');
  },
};

