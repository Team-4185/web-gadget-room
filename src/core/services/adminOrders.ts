import { api } from '@/core/config';
import type {
  AdminOrderAction,
  AdminOrdersRequestParams,
  ApiAdminOrderStatus,
  ApiAdminPaymentStatus,
  OrderDeliveryMethod,
  OrderPaymentMethod,
} from '@/core/types';

export type ApiAdminOrder = {
  id: number;
  customerId?: number;
  customerEmail: string;
  customerFirstName?: string;
  customerLastName?: string;
  customerPhoneNumber?: string;
  customerCity?: string | null;
  status: ApiAdminOrderStatus;
  paymentMethod: OrderPaymentMethod;
  paymentStatus: ApiAdminPaymentStatus;
  deliveryMethod: OrderDeliveryMethod;
  total: number;
  itemsCount?: number;
  createdAt: string;
  updatedAt: string | null;
  items?: {
    id: number;
    productName?: string;
    quantity: number;
    totalPrice: number;
  }[];
  availableActions?: AdminOrderAction[];
};

type RawAdminOrdersPage = {
  content?: ApiAdminOrder[];
  orders?: ApiAdminOrder[];
  items?: ApiAdminOrder[];
  data?: ApiAdminOrder[];
  totalElements?: number;
  totalItems?: number;
  totalPages?: number;
  page?: number;
  number?: number;
  size?: number;
  first?: boolean;
  last?: boolean;
  empty?: boolean;
};

export type AdminOrdersPage = {
  content: ApiAdminOrder[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type ApiAdminOrdersKpi = {
  confirmed: number;
  processing: number;
  delivered: number;
  cancelled: number;
};

const normalizeAdminOrdersPage = (
  data: RawAdminOrdersPage,
  fallbackPage: number,
  fallbackSize: number
): AdminOrdersPage => {
  const content = data.content ?? data.orders ?? data.items ?? data.data ?? [];
  const totalElements = data.totalElements ?? data.totalItems ?? content.length;
  const totalPages = data.totalPages ?? Math.max(1, Math.ceil(totalElements / fallbackSize));
  const page = data.page ?? data.number ?? fallbackPage;

  return {
    content,
    totalElements,
    totalPages,
    page,
    size: data.size ?? fallbackSize,
    first: data.first ?? page <= 1,
    last: data.last ?? page >= totalPages,
    empty: data.empty ?? content.length === 0,
  };
};

export const adminOrdersService = {
  async getKpis(signal?: AbortSignal) {
    const { data } = await api.get<ApiAdminOrdersKpi>('/api/v1/admin/orders/kpi', { signal });
    return data;
  },
  async getOrders(params: AdminOrdersRequestParams, signal?: AbortSignal) {
    const { data } = await api.get<RawAdminOrdersPage>('/api/v1/admin/orders', {
      params,
      signal,
    });

    return normalizeAdminOrdersPage(data, params.page, params.size);
  },
  async getOrder(id: number, signal?: AbortSignal) {
    const { data } = await api.get<ApiAdminOrder>(`/api/v1/admin/orders/${id}`, { signal });
    return data;
  },
  async applyAction(id: number, action: AdminOrderAction) {
    const { data } = await api.post<ApiAdminOrder>(`/api/v1/admin/orders/${id}/actions`, {
      action,
    });
    return data;
  },
};
