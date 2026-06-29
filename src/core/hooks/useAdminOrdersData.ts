import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import { ADMIN_MANAGED_ORDERS, ADMIN_ORDER_KPIS } from '@/core/constants';
import { adminOrdersService, type ApiAdminOrder, type ApiAdminOrdersKpi } from '@/core/services';
import type {
  AdminOrderAction,
  AdminOrderStatus,
  ApiPhoneColorName,
  ApiAdminOrderStatus,
  ApiStorageCapacityName,
  IAdminOrderDetails,
  IAdminOrderDetailsItem,
  IAdminManagedOrderItem,
  IAdminOrderKpiItem,
} from '@/core/types';
import {
  formatProductDisplayName,
  formatStorageCapacity,
  getPhoneColorFromVariant,
  getStorageCapacityFromVariant,
  toErrorMessage,
} from '@/core/utils';
import { useAdminPanelData } from './useAdminPanelData';
import type { AdminOrderFilterId } from '@/core/constants';

const PAGE_SIZE = 10;

const STATUS_BY_FILTER: Partial<Record<AdminOrderFilterId, ApiAdminOrderStatus>> = {
  new: 'NEW',
  confirmed: 'CONFIRMED',
  processing: 'PROCESSING',
  shipped: 'SHIPPED',
  delivered: 'DELIVERED',
  cancelled: 'CANCELLED',
};

const mapApiStatusToFrontendStatus = (status: string): AdminOrderStatus => {
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

const mapAdminOrder = (order: ApiAdminOrder): IAdminManagedOrderItem => {
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
    status: mapApiStatusToFrontendStatus(order.status),
    availableActions: order.availableActions ?? [],
  };
};

const mapAdminOrderDetailsItem = (item: NonNullable<ApiAdminOrder['items']>[number]) => {
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
  } satisfies IAdminOrderDetailsItem;
};

const mapAdminOrderDetails = (order: ApiAdminOrder): IAdminOrderDetails => {
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
    status: mapApiStatusToFrontendStatus(order.status),
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

const mapAdminOrderKpis = (kpis: ApiAdminOrdersKpi): IAdminOrderKpiItem[] =>
  ADMIN_ORDER_KPIS.map((item) => ({
    ...item,
    value: formatKpiValue(kpis[item.id as keyof ApiAdminOrdersKpi]),
  }));

export const useAdminOrdersData = () => {
  const { greeting, subtitle, menu } = useAdminPanelData();
  const { enqueueSnackbar } = useSnackbar();
  const [kpis, setKpis] = useState<IAdminOrderKpiItem[]>(ADMIN_ORDER_KPIS);
  const [orders, setOrders] = useState<IAdminManagedOrderItem[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<IAdminOrderDetails | null>(null);
  const [isOrderDetailsLoading, setIsOrderDetailsLoading] = useState(false);
  const [isOrderActionLoading, setIsOrderActionLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<AdminOrderFilterId>('all');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadKpis = async () => {
      try {
        const response = await adminOrdersService.getKpis(controller.signal);
        setKpis(mapAdminOrderKpis(response));
      } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ERR_CANCELED') return;

        setKpis(ADMIN_ORDER_KPIS);
      }
    };

    loadKpis();

    return () => controller.abort();
  }, [reloadKey]);

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

        setOrders(response.content.map(mapAdminOrder));
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
        setIsOrderActionLoading(true);
        await adminOrdersService.applyAction(Number(orderId), action);
        setReloadKey((key) => key + 1);
        const details = await adminOrdersService.getOrder(Number(orderId));
        setSelectedOrderDetails(mapAdminOrderDetails(details));
        enqueueSnackbar('Order updated.', { variant: 'success' });
      } catch (error) {
        enqueueSnackbar(toErrorMessage(error, 'Failed to update order.'), { variant: 'error' });
        setReloadKey((key) => key + 1);
      } finally {
        setIsOrderActionLoading(false);
      }
    },
    [enqueueSnackbar]
  );

  const openOrderDetails = useCallback(
    async (orderId: string) => {
      setIsOrderDetailsLoading(true);

      try {
        const details = await adminOrdersService.getOrder(Number(orderId));
        setSelectedOrderDetails(mapAdminOrderDetails(details));
      } catch (error) {
        enqueueSnackbar(toErrorMessage(error, 'Failed to load order details.'), {
          variant: 'error',
        });
      } finally {
        setIsOrderDetailsLoading(false);
      }
    },
    [enqueueSnackbar]
  );

  const closeOrderDetails = useCallback(() => {
    setSelectedOrderDetails(null);
    setIsOrderDetailsLoading(false);
    setIsOrderActionLoading(false);
  }, []);

  return useMemo(
    () => ({
      greeting,
      subtitle,
      menu,
      kpis,
      orders,
      totalOrders,
      currentPage,
      totalPages,
      isFirstPage,
      isLastPage,
      isLoading,
      selectedOrderDetails,
      isOrderDetailsLoading,
      isOrderActionLoading,
      activeFilter,
      onFilterChange,
      goToPreviousPage,
      goToNextPage,
      applyOrderAction,
      openOrderDetails,
      closeOrderDetails,
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
      isOrderActionLoading,
      isOrderDetailsLoading,
      kpis,
      menu,
      onFilterChange,
      orders,
      selectedOrderDetails,
      subtitle,
      totalOrders,
      totalPages,
    ]
  );
};
