import type { ComponentType } from 'react';
import type { SvgIconProps } from '@mui/material';
import type { ApiPhoneColorName, ApiPhoneImage, ApiStorageCapacityName, PhoneStockStatus } from './product';
import type { OrderDeliveryMethod, OrderPaymentMethod } from './order';

export type AdminPanelTab = 'dashboard' | 'product' | 'orders' | 'customers';
export type AdminProductModalTab = 'details' | 'variants';

export interface IAdminPanelMenuItem {
  id: AdminPanelTab;
  label: string;
  icon: ComponentType<SvgIconProps>;
  badge?: number;
}

export type ApiAdminSidebarCounters = {
  productsCount: number;
  ordersCount: number;
  customersCount: number;
};

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
  brand?: string;
  sales: string;
  trend: string;
  stock: string;
  statusLabel: string;
  image: string;
}

export type AdminProductStatus = PhoneStockStatus;

export interface IAdminPanelManagedProduct {
  id: string;
  title: string;
  modelName?: string;
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
  variants: AdminProductVariantDraft[];
}

export type AdminProductFormErrors = Partial<Record<keyof IAdminProductFormState, string>>;

export type AdminProductVariantDraft = {
  clientId: string;
  id?: number;
  color: ApiPhoneColorName;
  storageCapacity: ApiStorageCapacityName;
  price: string;
  stock: string;
  sku?: string;
  isPersisted?: boolean;
};

export type AdminProductVariantField = 'color' | 'storageCapacity' | 'price' | 'stock';

export type AdminProductVariantErrors = Record<
  string,
  Partial<Record<AdminProductVariantField, string>>
>;

export interface IAdminPanelOrderItem {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  age: string;
  status: AdminOrderStatus;
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

export type ApiAdminCustomerStatus = 'ACTIVE' | 'INACTIVE' | 'NEW';

export type ApiAdminCustomerKpi = {
  totalClients: number;
  newCustomersThisMonth: number;
  inactiveCustomers: number;
  averageReceipt: number;
};

export type ApiAdminCustomer = {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  city: string | null;
  status: ApiAdminCustomerStatus;
  totalOrders: number;
  totalSpent: number;
  lastOrderAt: string | null;
  createdAt: string;
  updatedAt: string | null;
};

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
  | 'new'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';
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
  paymentMethod: OrderPaymentMethod;
  paymentStatus: ApiAdminPaymentStatus;
  deliveryMethod: OrderDeliveryMethod;
  itemsCount: number;
  date: string;
  time: string;
  status: AdminOrderStatus;
  availableActions?: AdminOrderAction[];
}

export interface IAdminOrderDetailsItem {
  id: string;
  title: string;
  sku: string;
  image: string;
  quantity: number;
  color?: string;
  storage?: string;
  unitPrice: number;
  totalPrice: number;
}

export interface IAdminOrderDetails {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  status: AdminOrderStatus;
  paymentMethod: OrderPaymentMethod;
  paymentStatus: ApiAdminPaymentStatus;
  deliveryMethod: OrderDeliveryMethod;
  shippingAddress: string;
  total: number;
  items: IAdminOrderDetailsItem[];
  availableActions: AdminOrderAction[];
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
