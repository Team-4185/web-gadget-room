import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import { ADMIN_MANAGED_ORDERS, ADMIN_ORDER_KPIS } from '@/core/constants';
import { adminOrdersService, type ApiAdminOrder } from '@/core/services';
import type {
  AdminOrderAction,
  AdminOrderStatus,
  ApiAdminOrderStatus,
  IAdminManagedOrderItem,
} from '@/core/types';
import { toErrorMessage } from '@/core/utils';
import { useAdminPanelData } from './useAdminPanelData';
import type { AdminOrderFilterId } from '@/core/constants';

const PAGE_SIZE = 10;

const STATUS_BY_FILTER: Partial<Record<AdminOrderFilterId, ApiAdminOrderStatus>> = {
  confirmed: 'CONFIRMED',
  processing: 'PROCESSING',
  delivered: 'DELIVERED',
  cancelled: 'CANCELLED',
};

const mapApiStatusToFrontendStatus = (status: string): AdminOrderStatus => {
  switch (status) {
    case 'PROCESSING':
      return 'processing';
    case 'SHIPPED':
    case 'DELIVERED':
      return 'delivered';
    case 'CANCELLED':
      return 'cancelled';
    case 'NEW':
    case 'CONFIRMED':
    default:
      return 'confirmed';
  }
};

const formatCurrency = (value: number) => `$${value.toLocaleString('en-US')}`;

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

const mapAdminOrderRows = (order: ApiAdminOrder): IAdminManagedOrderItem[] => {
  const dateTime = formatOrderDateTime(order.createdAt);
  const customer = [order.customerFirstName, order.customerLastName].filter(Boolean).join(' ');
  const baseOrderRow = {
    orderNumber: `#ORD-${order.id}`,
    customer: customer || 'Guest',
    email: order.customerEmail,
    date: dateTime.date,
    time: dateTime.time,
    status: mapApiStatusToFrontendStatus(order.status),
    availableActions: order.availableActions ?? [],
  };

  if (!order.items.length) {
    return [
      {
        ...baseOrderRow,
        id: String(order.id),
        product: 'Order item',
        quantity: 0,
        amount: formatCurrency(order.total),
      },
    ];
  }

  return order.items.map((item) => ({
    ...baseOrderRow,
    id: `${order.id}-${item.id}`,
    product: item.productName ?? item.phone?.name ?? 'Order item',
    quantity: item.quantity,
    amount: formatCurrency(item.totalPrice),
  }));
};

export const useAdminOrdersData = () => {
  const { greeting, subtitle, menu } = useAdminPanelData();
  const { enqueueSnackbar } = useSnackbar();
  const [orders, setOrders] = useState<IAdminManagedOrderItem[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<AdminOrderFilterId>('all');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadOrders = async () => {
      setIsLoading(true);

      try {
        const response = await adminOrdersService.getOrders(
          {
            page: currentPage,
            size: PAGE_SIZE,
            status: STATUS_BY_FILTER[activeFilter],
            sort: 'createdAt_desc',
          },
          controller.signal
        );

        const detailedOrders = await Promise.all(
          response.content.map(async (order) => {
            try {
              return await adminOrdersService.getOrder(order.id, controller.signal);
            } catch {
              return order;
            }
          })
        );

        setOrders(detailedOrders.flatMap(mapAdminOrderRows));
        setTotalOrders(response.totalElements);
        setTotalPages(response.totalPages);
        setIsFirstPage(response.first);
        setIsLastPage(response.last);
      } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ERR_CANCELED') return;

        setOrders(ADMIN_MANAGED_ORDERS.slice(0, PAGE_SIZE));
        setTotalOrders(ADMIN_MANAGED_ORDERS.length);
        setTotalPages(1);
        setIsFirstPage(true);
        setIsLastPage(true);
        enqueueSnackbar(toErrorMessage(error, 'Failed to load admin orders.'), {
          variant: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();

    return () => controller.abort();
  }, [activeFilter, currentPage, enqueueSnackbar, reloadKey]);

  const onFilterChange = useCallback((filter: AdminOrderFilterId) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  }, []);

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((page) => Math.max(1, page - 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage((page) => (isLastPage ? page : page + 1));
  }, [isLastPage]);

  const applyOrderAction = useCallback(
    async (orderId: string, action: AdminOrderAction) => {
      try {
        await adminOrdersService.applyAction(Number(orderId), action);
        setReloadKey((key) => key + 1);
        enqueueSnackbar('Order updated.', { variant: 'success' });
      } catch (error) {
        enqueueSnackbar(toErrorMessage(error, 'Failed to update order.'), { variant: 'error' });
      }
    },
    [enqueueSnackbar]
  );

  return useMemo(
    () => ({
      greeting,
      subtitle,
      menu,
      kpis: ADMIN_ORDER_KPIS,
      orders,
      totalOrders,
      currentPage,
      totalPages,
      isFirstPage,
      isLastPage,
      isLoading,
      activeFilter,
      onFilterChange,
      goToPreviousPage,
      goToNextPage,
      applyOrderAction,
    }),
    [
      activeFilter,
      applyOrderAction,
      currentPage,
      goToNextPage,
      goToPreviousPage,
      greeting,
      isFirstPage,
      isLastPage,
      isLoading,
      menu,
      onFilterChange,
      orders,
      subtitle,
      totalOrders,
      totalPages,
    ]
  );
};
