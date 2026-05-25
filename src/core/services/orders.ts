import { api } from '@/core/config';
import type { CreateOrderPayload, OrderResponse } from '@/core/types';

export type OrdersPageResponse = {
  content: OrderResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export const ordersService = {
  async createOrder(payload: CreateOrderPayload) {
    const { data } = await api.post<OrderResponse>('/api/v1/orders', payload);
    return data;
  },
  async getMyOrders(page = 0, size = 10) {
    const { data } = await api.get<OrdersPageResponse>('/api/v1/orders/my', {
      params: { page, size },
    });

    return data;
  },
};
