import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import { ADMIN_MANAGED_ORDERS, ADMIN_ORDER_KPIS, type AdminOrderFilterId } from '@/core/constants';
import { adminOrdersService } from '@/core/services';
import type { IAdminManagedOrderItem, IAdminOrderKpiItem } from '@/core/types';
import {
  ADMIN_ORDER_STATUS_BY_FILTER,
  mapAdminOrder,
  mapAdminOrderKpis,
  toErrorMessage,
} from '@/core/utils';

import { useAdminOrderActions } from './useAdminOrderActions';
import { useAdminPanelData } from './useAdminPanelData';

const PAGE_SIZE = 10;

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
  const [activeFilter, setActiveFilter] = useState<AdminOrderFilterId>('all');
  const [reloadKey, setReloadKey] = useState(0);
  const refreshOrders = useCallback(() => setReloadKey((key) => key + 1), []);
  const {
    selectedOrderDetails,
    isOrderDetailsLoading,
    isOrderActionLoading,
    applyOrderAction,
    openOrderDetails,
    closeOrderDetails,
  } = useAdminOrderActions({
    onOrdersChanged: refreshOrders,
  });

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
            status: ADMIN_ORDER_STATUS_BY_FILTER[activeFilter],
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
      closeOrderDetails,
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
      openOrderDetails,
      orders,
      selectedOrderDetails,
      subtitle,
      totalOrders,
      totalPages,
    ]
  );
};
