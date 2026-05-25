import { useEffect, useState } from 'react';

import { FALLBACK_IMAGE } from '@/core/constants';
import { ordersService, phonesService } from '@/core/services';
import type { IUserPanelOrder, OrderResponse, OrderStatus } from '@/core/types';
import { toErrorMessage } from '@/core/utils';

const mapOrderStatus = (status: string): OrderStatus => {
  switch (status.toUpperCase()) {
    case 'DELIVERED':
    case 'COMPLETED':
      return 'delivered';
    case 'SHIPPED':
    case 'SHIPPING':
      return 'shipped';
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

const mapOrderToUserPanelOrder = async (
  order: OrderResponse,
  signal?: AbortSignal
): Promise<IUserPanelOrder> => {
  const items = await Promise.all(
    order.items.map(async (item) => ({
      id: String(item.id),
      title: item.productName || item.phone?.name || `Phone #${item.phone?.id ?? item.id}`,
      quantity: item.quantity,
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
