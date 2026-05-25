import { useEffect, useMemo, useState } from 'react';

import { FALLBACK_IMAGE } from '@/core/constants';
import { ordersService } from '@/core/services';
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

const mapOrderToUserPanelOrder = (order: OrderResponse): IUserPanelOrder => ({
  id: String(order.id),
  orderNumber: `#ORD-${order.id}`,
  date: formatOrderDate(order.createdAt),
  status: mapOrderStatus(order.status),
  total: order.total,
  items: order.items.map((item) => ({
    id: String(item.id),
    title: item.productName || item.phone?.name || `Phone #${item.phone?.id ?? item.id}`,
    quantity: item.quantity,
    price: item.totalPrice,
    image: item.phone?.images?.[0]?.url || FALLBACK_IMAGE,
  })),
});

export const useUserOrders = (page = 0, size = 10) => {
  const [apiOrders, setApiOrders] = useState<OrderResponse[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const loadOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        const ordersPage = await ordersService.getMyOrders(page, size);

        if (ignore) return;

        setApiOrders(ordersPage.content);
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
    };
  }, [page, size]);

  const orders = useMemo(() => apiOrders.map(mapOrderToUserPanelOrder), [apiOrders]);

  return { orders, totalElements, loading, error };
};
