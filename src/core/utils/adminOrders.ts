import { ADMIN_ORDER_KPIS, type AdminOrderFilterId } from '@/core/constants';
import type { ApiAdminOrder, ApiAdminOrdersKpi } from '@/core/services';
import type {
  AdminOrderStatus,
  ApiAdminOrderStatus,
  ApiPhoneColorName,
  ApiStorageCapacityName,
  IAdminManagedOrderItem,
  IAdminOrderDetails,
  IAdminOrderDetailsItem,
  IAdminOrderKpiItem,
} from '@/core/types';

import { formatProductDisplayName } from './products';
import {
  formatStorageCapacity,
  getPhoneColorFromVariant,
  getStorageCapacityFromVariant,
} from './productVariants';

export const ADMIN_ORDER_STATUS_BY_FILTER: Partial<
  Record<AdminOrderFilterId, ApiAdminOrderStatus>
> = {
  new: 'NEW',
  confirmed: 'CONFIRMED',
  processing: 'PROCESSING',
  shipped: 'SHIPPED',
  delivered: 'DELIVERED',
  cancelled: 'CANCELLED',
};

export const mapApiStatusToAdminOrderStatus = (status: string): AdminOrderStatus => {
  switch (status) {
    case 'NEW':
      return 'new';
    case 'CONFIRMED':
      return 'confirmed';
    case 'PROCESSING':
      return 'processing';
    case 'SHIPPED':
      return 'shipped';
    case 'CANCELLED':
      return 'cancelled';
    case 'DELIVERED':
    default:
      return 'delivered';
  }
};

const formatOrderDateTime = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return { date: value, time: '' };
  }

  return {
    date: new Intl.DateTimeFormat('en', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date),
    time: new Intl.DateTimeFormat('en', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date),
  };
};

const formatVariantColor = (value?: string) =>
  value ? getPhoneColorFromVariant(value as ApiPhoneColorName).displayName : undefined;

const formatVariantStorage = (value?: string) =>
  value
    ? formatStorageCapacity(getStorageCapacityFromVariant(value as ApiStorageCapacityName))
    : undefined;

const formatShippingAddress = (order: ApiAdminOrder) => {
  const address = order.shippingAddress;

  if (!address) return order.pickupPointId ?? 'Not specified';

  return [
    address.logisticsCompany,
    address.logisticPostOffice,
    address.street,
    address.houseNumber,
    address.apartmentNumber,
    address.city,
    address.region,
    address.country,
    address.zipCode,
  ]
    .filter(Boolean)
    .join(', ');
};

export const mapAdminOrder = (order: ApiAdminOrder): IAdminManagedOrderItem => {
  const dateTime = formatOrderDateTime(order.createdAt);
  const customer = [order.customerFirstName, order.customerLastName].filter(Boolean).join(' ');

  return {
    id: String(order.id),
    orderNumber: `#ORD-${order.id}`,
    customer: customer || 'Guest',
    email: order.customerEmail,
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentStatus,
    deliveryMethod: order.deliveryMethod,
    itemsCount: order.itemsCount ?? order.items?.length ?? 0,
    date: dateTime.date,
    time: dateTime.time,
    status: mapApiStatusToAdminOrderStatus(order.status),
    availableActions: order.availableActions ?? [],
  };
};

const mapAdminOrderDetailsItem = (
  item: NonNullable<ApiAdminOrder['items']>[number]
): IAdminOrderDetailsItem => {
  const phone = item.phone;
  const title =
    item.productName || phone?.name
      ? formatProductDisplayName(phone?.brand, item.productName || phone?.name || '')
      : `Product #${item.id}`;

  return {
    id: String(item.id),
    title,
    sku: item.sku ?? item.variant?.sku ?? 'Not specified',
    image: phone?.previewImage?.url ?? phone?.images?.[0]?.url ?? '',
    quantity: item.quantity,
    color: formatVariantColor(item.variant?.color ?? item.selectedColor),
    storage: formatVariantStorage(item.variant?.storageCapacity ?? item.selectedStorage),
    unitPrice: item.unitPrice ?? item.variant?.price ?? 0,
    totalPrice: item.totalPrice,
  };
};

export const mapAdminOrderDetails = (order: ApiAdminOrder): IAdminOrderDetails => {
  const dateTime = formatOrderDateTime(order.createdAt);
  const customer = [order.customerFirstName, order.customerLastName].filter(Boolean).join(' ');

  return {
    id: String(order.id),
    orderNumber: `#ORD-${order.id}`,
    customer: customer || order.user?.email || 'Guest',
    email: order.customerEmail,
    phone: order.customerPhoneNumber || 'Not specified',
    date: dateTime.date,
    time: dateTime.time,
    status: mapApiStatusToAdminOrderStatus(order.status),
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentDetails?.paymentStatus ?? order.paymentStatus,
    deliveryMethod: order.deliveryMethod,
    shippingAddress: formatShippingAddress(order),
    total: order.total,
    items: (order.items ?? []).map(mapAdminOrderDetailsItem),
    availableActions: order.availableActions ?? [],
  };
};

const formatKpiValue = (value: number) => new Intl.NumberFormat('en-US').format(value);

export const mapAdminOrderKpis = (kpis: ApiAdminOrdersKpi): IAdminOrderKpiItem[] =>
  ADMIN_ORDER_KPIS.map((item) => ({
    ...item,
    value: formatKpiValue(kpis[item.id as keyof ApiAdminOrdersKpi]),
  }));
