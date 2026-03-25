import type { ComponentType } from 'react';
import type { SvgIconProps } from '@mui/material';

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

export type AdminProductStatus = 'in_stock' | 'low_stock';

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

export interface IAdminPanelOrderItem {
  id: string;
  orderNumber: string;
  customer: string;
  product: string;
  age: string;
  status: 'processing' | 'paid' | 'shipping';
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

export type AdminCustomerStatus = 'vip' | 'active' | 'new';

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

export type AdminOrderStatus =
  | 'in_processing'
  | 'paid'
  | 'in_delivery'
  | 'delivered'
  | 'cancelled';

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
}

export type AdminAnalyticsRange = 'week' | 'month' | 'year';

export interface IAdminSalesAnalyticsPoint {
  label: string;
  revenue: number;
  orders: number;
}
