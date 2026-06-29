import { api } from '@/core/config';
import type { ApiAdminCustomer, ApiAdminCustomerKpi } from '@/core/types';

type RawAdminCustomersPage = {
  content?: ApiAdminCustomer[];
  totalElements?: number;
  totalPages?: number;
  page?: number;
  size?: number;
  first?: boolean;
  last?: boolean;
  empty?: boolean;
};

export type AdminCustomersPage = {
  content: ApiAdminCustomer[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type AdminCustomersRequestParams = {
  page: number;
  size: number;
  search?: string;
  sort?:
    | 'createdAt_desc'
    | 'createdAt_asc'
    | 'email_asc'
    | 'email_desc'
    | 'totalOrders_desc'
    | 'totalOrders_asc'
    | 'totalSpent_desc'
    | 'totalSpent_asc'
    | 'lastOrderAt_desc'
    | 'lastOrderAt_asc';
};

const normalizeCustomersPage = (
  data: RawAdminCustomersPage,
  fallbackPage: number,
  fallbackSize: number
): AdminCustomersPage => {
  const content = data.content ?? [];
  const totalElements = data.totalElements ?? content.length;
  const totalPages = data.totalPages ?? Math.max(1, Math.ceil(totalElements / fallbackSize));
  const page = data.page ?? fallbackPage;

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

export const adminCustomersService = {
  async getKpis(signal?: AbortSignal) {
    const { data } = await api.get<ApiAdminCustomerKpi>('/api/v1/admin/customers/kpi', {
      signal,
    });
    return data;
  },
  async getCustomers(params: AdminCustomersRequestParams, signal?: AbortSignal) {
    const { data } = await api.get<RawAdminCustomersPage>('/api/v1/admin/customers', {
      params,
      signal,
    });
    return normalizeCustomersPage(data, params.page, params.size);
  },
  async deleteCustomer(id: number) {
    await api.delete<void>(`/api/v1/users/${id}`);
  },
};
