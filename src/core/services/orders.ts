import { api } from '@/core/config';
import type { CreateOrderPayload, OrderResponse } from '@/core/types';

export const ordersService = {
  async createOrder(payload: CreateOrderPayload) {
    const { data } = await api.post<OrderResponse>('/api/v1/orders', payload);
    return data;
  },
};
