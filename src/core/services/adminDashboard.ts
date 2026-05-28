import { api } from '@/core/config';
import type { AdminProductStatus } from '@/core/types';

type DashboardOrderStatus =
  | 'NEW'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';
type DashboardPaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export type AdminDashboardSummary = {
  totalRevenue: number;
  totalRevenueChangePercent: number | null;
  totalOrders: number;
  totalOrdersChangePercent: number | null;
  processingOrders: number;
  itemsInStock: number;
  itemsInStockChangePercent: number | null;
  lowStockProducts: number;
  newClients: number;
  newClientsChangePercent: number | null;
};

export type AdminDashboardSalesPoint = {
  date: string;
  revenue: number;
  ordersCount: number;
};

export type AdminDashboardBrandSale = {
  brand: string;
  revenue: number;
  unitsSold: number;
};

export type AdminDashboardTopProduct = {
  phoneId: number;
  name: string;
  sku: string;
  unitsSold: number;
  revenue: number;
};

export type AdminDashboardRecentOrder = {
  id: number;
  customerEmail: string;
  status: DashboardOrderStatus;
  paymentStatus: DashboardPaymentStatus;
  total: number;
  createdAt: string;
};

export type AdminDashboardLowStockProduct = {
  id: number;
  name: string;
  sku: string;
  brand: string;
  stock: number;
  status: AdminProductStatus;
};

const BASE_PATH = '/api/v1/admin/dashboard';

export const adminDashboardService = {
  async getSummary(signal?: AbortSignal) {
    const { data } = await api.get<AdminDashboardSummary>(`${BASE_PATH}/summary`, { signal });
    return data;
  },
  async getSalesAnalytics(signal?: AbortSignal) {
    const { data } = await api.get<AdminDashboardSalesPoint[]>(`${BASE_PATH}/sales-analytics`, {
      signal,
    });
    return data;
  },
  async getSalesByBrand(signal?: AbortSignal) {
    const { data } = await api.get<AdminDashboardBrandSale[]>(`${BASE_PATH}/sales-by-brand`, {
      signal,
    });
    return data;
  },
  async getTopSellingProducts(signal?: AbortSignal) {
    const { data } = await api.get<AdminDashboardTopProduct[]>(
      `${BASE_PATH}/top-selling-products`,
      { signal }
    );
    return data;
  },
  async getRecentOrders(signal?: AbortSignal) {
    const { data } = await api.get<AdminDashboardRecentOrder[]>(`${BASE_PATH}/recent-orders`, {
      signal,
    });
    return data;
  },
  async getLowStockAlerts(signal?: AbortSignal) {
    const { data } = await api.get<AdminDashboardLowStockProduct[]>(
      `${BASE_PATH}/low-stock-alerts`,
      { signal }
    );
    return data;
  },
};
