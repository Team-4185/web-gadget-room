import { useEffect, useState } from 'react';

import { FALLBACK_IMAGE } from '@/core/constants';
import { ordersService, phonesService } from '@/core/services';
import type {
  ApiPhoneColorName,
  ApiStorageCapacityName,
  IUserPanelOrder,
  OrderResponse,
  OrderStatus,
} from '@/core/types';
import {
  formatProductDisplayName,
  formatStorageCapacity,
  getPhoneColorFromVariant,
  getStorageCapacityFromVariant,
  toErrorMessage,
} from '@/core/utils';

const mapOrderStatus = (status: string): OrderStatus => {
  switch (status.toUpperCase()) {
    case 'NEW':
      return 'new';
    case 'CONFIRMED':
      return 'confirmed';
    case 'PROCESSING':
      return 'processing';
    case 'SHIPPED':
      return 'shipped';
    case 'DELIVERED':
      return 'delivered';
    case 'CANCELLED':
      return 'cancelled';
    default:
      return 'processing';
  }
};

const formatOrderDate = (date: string) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return date;

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(parsedDate);
};

const getOrderItemImage = async (imageUrl?: string, signal?: AbortSignal) => {
  if (!imageUrl) return FALLBACK_IMAGE;

  try {
    return await phonesService.getImageObjectUrl(imageUrl, signal);
  } catch {
    return FALLBACK_IMAGE;
  }
};

const formatOrderItemColor = (value?: string) => {
  if (!value) return undefined;

  return getPhoneColorFromVariant(value as ApiPhoneColorName).displayName;
};

const formatOrderItemStorage = (value?: string) => {
  if (!value) return undefined;

  return formatStorageCapacity(getStorageCapacityFromVariant(value as ApiStorageCapacityName));
};

const mapOrderToUserPanelOrder = async (
  order: OrderResponse,
  signal?: AbortSignal
): Promise<IUserPanelOrder> => {
  const items = await Promise.all(
    order.items.map(async (item) => ({
      id: String(item.id),
      title:
        item.productName || item.phone?.name
          ? formatProductDisplayName(item.phone?.brand, item.productName || item.phone.name)
          : `Phone #${item.phone?.id ?? item.id}`,
      quantity: item.quantity,
      color: formatOrderItemColor(item.variant?.color ?? item.selectedColor ?? item.color),
      storage: formatOrderItemStorage(
        item.variant?.storageCapacity ??
          item.selectedStorage ??
          item.storageCapacity ??
          item.storage
      ),
      price: item.totalPrice,
      image: await getOrderItemImage(item.phone?.images?.[0]?.url, signal),
    }))
  );

  return {
    id: String(order.id),
    orderNumber: `#ORD-${order.id}`,
    date: formatOrderDate(order.createdAt),
    status: mapOrderStatus(order.status),
    total: order.total,
    items,
  };
};

export const useUserOrders = (page = 0, size = 10) => {
  const [orders, setOrders] = useState<IUserPanelOrder[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    const loadOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        const ordersPage = await ordersService.getMyOrders(page, size);
        const mappedOrders = await Promise.all(
          ordersPage.content.map((order) => mapOrderToUserPanelOrder(order, controller.signal))
        );

        if (ignore) return;

        setOrders(mappedOrders);
        setTotalElements(ordersPage.totalElements);
      } catch (err) {
        if (ignore) return;

        setError(toErrorMessage(err, 'Failed to load orders.'));
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadOrders();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [page, size]);

  return { orders, totalElements, loading, error };
};
