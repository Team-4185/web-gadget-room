import type { ComponentType } from 'react';
import type { SvgIconProps } from '@mui/material';
import type { ApiPhoneImage, PhoneStockStatus } from './product';

export type AdminPanelTab = 'dashboard' | 'product' | 'orders' | 'customers';

export interface IAdminPanelMenuItem {
  id: AdminPanelTab;
  label: string;
  icon: ComponentType<SvgIconProps>;
  badge?: number;
}

export interface IAdminPanelStatItem {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  trend: string;
  isPositive: boolean;
  icon: ComponentType<SvgIconProps>;
}

export interface IAdminPanelBrandItem {
  id: string;
  label: string;
  share: number;
  color: string;
}

export interface IAdminPanelProductItem {
  id: string;
  title: string;
  sales: string;
  trend: string;
  stock: string;
  image: string;
}

export type AdminProductStatus = PhoneStockStatus;

export interface IAdminPanelManagedProduct {
  id: string;
  title: string;
  sku: string;
  brand: string;
  price: string;
  stock: string;
  status: AdminProductStatus;
  image: string;
}

export interface IAdminProductModalImage {
  id: number;
  name: string;
  src: string;
}

export interface IAdminProductFormState {
  name: string;
  sku: string;
  brand: string;
  price: string;
  stock: string;
  releaseYear: string;
  cpu: string;
  coresNumber: string;
  screenSize: string;
  frontCamera: string;
  mainCamera: string;
  batteryCapacity: string;
  description: string;
}

export type AdminProductFormErrors = Partial<Record<keyof IAdminProductFormState, string>>;

export interface IAdminPanelOrderItem {
  id: string;
  orderNumber: string;
  customer: string;
  product: string;
  age: string;
  status: 'confirmed' | 'processing' | 'delivered' | 'cancelled';
}

export interface IAdminPanelLowStockItem {
  id: string;
  title: string;
  left: number;
  threshold: number;
}

export interface IAdminCustomerKpiItem {
  id: string;
  title: string;
  value: string;
  icon: ComponentType<SvgIconProps>;
}

export type AdminCustomerStatus = 'inactive' | 'active' | 'new';

export interface IAdminCustomerItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  spent: string;
  registeredAt: string;
  status: AdminCustomerStatus;
}

export interface IAdminOrderKpiItem {
  id: string;
  title: string;
  value: string;
  icon: ComponentType<SvgIconProps>;
}

export type AdminOrderStatus = 'processing' | 'confirmed' | 'delivered' | 'cancelled';
export type ApiAdminOrderStatus =
  | 'NEW'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';
export type ApiAdminPaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
export type ApiAdminOrderSort =
  | 'createdAt_asc'
  | 'createdAt_desc'
  | 'total_asc'
  | 'total_desc'
  | 'status_asc'
  | 'status_desc'
  | 'paymentStatus_asc'
  | 'paymentStatus_desc'
  | 'customerEmail_asc'
  | 'customerEmail_desc'
  | 'id_asc'
  | 'id_desc';
export type AdminOrderAction = 'confirm' | 'cancel' | 'process' | 'ship' | 'deliver';

export interface IAdminManagedOrderItem {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  product: string;
  quantity: number;
  amount: string;
  date: string;
  time: string;
  status: AdminOrderStatus;
  availableActions?: AdminOrderAction[];
}

export type AdminAnalyticsRange = 'week' | 'month' | 'year';

export interface IAdminSalesAnalyticsPoint {
  label: string;
  revenue: number;
  orders: number;
}

export type ApiAdminProduct = {
  id: number;
  name: string;
  brand: string;
  price: number;
  releaseYear: number;
  previewImage: ApiPhoneImage | null;
  sku?: string | null;
  stock?: number | null;
  status?: AdminProductStatus | null;
};

export type ApiAdminProductsPage = {
  content: ApiAdminProduct[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};

export type AdminProductsRequestParams = {
  page: number;
  size: number;
  search: string;
  brand: string;
  status: AdminProductStatus | '';
};

export type AdminOrdersRequestParams = {
  page: number;
  size: number;
  status?: ApiAdminOrderStatus;
  paymentStatus?: ApiAdminPaymentStatus;
  sort?: ApiAdminOrderSort;
};
