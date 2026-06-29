import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import { ADMIN_CUSTOMERS, ADMIN_CUSTOMER_KPIS } from '@/core/constants';
import { ArrowRightUp, Customers, Dollar, Star } from '@/assets';
import { adminCustomersService } from '@/core/services';
import { toErrorMessage } from '@/core/utils';
import type {
  AdminCustomerStatus,
  ApiAdminCustomer,
  ApiAdminCustomerKpi,
  ApiAdminCustomerStatus,
  IAdminCustomerItem,
  IAdminCustomerKpiItem,
} from '@/core/types';
import { useAdminPanelData } from './useAdminPanelData';

const ADMIN_CUSTOMERS_PAGE_SIZE = 10;

const formatNumber = (value: number) => value.toLocaleString('en-US');

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const mapCustomerKpis = (kpi: ApiAdminCustomerKpi): IAdminCustomerKpiItem[] => [
  { id: 'total', title: 'Total clients', value: formatNumber(kpi.totalClients), icon: Customers },
  {
    id: 'new_month',
    title: 'New (month)',
    value: formatNumber(kpi.newCustomersThisMonth),
    icon: Star,
  },
  {
    id: 'inactive',
    title: 'Inactive',
    value: formatNumber(kpi.inactiveCustomers),
    icon: ArrowRightUp,
  },
  { id: 'receipt', title: 'Avg receipt', value: formatCurrency(kpi.averageReceipt), icon: Dollar },
];

const mapCustomerStatus = (status: ApiAdminCustomerStatus): AdminCustomerStatus =>
  status.toLowerCase() as AdminCustomerStatus;

const formatCustomerDate = (date: string) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return date;

  return parsedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const mapCustomerRow = (customer: ApiAdminCustomer): IAdminCustomerItem => {
  const name = [customer.firstName, customer.lastName].filter(Boolean).join(' ').trim();

  return {
    id: String(customer.id),
    name: name || customer.email,
    email: customer.email,
    phone: customer.phoneNumber ?? '',
    orders: customer.totalOrders,
    spent: formatCurrency(customer.totalSpent),
    registeredAt: formatCustomerDate(customer.createdAt),
    status: mapCustomerStatus(customer.status),
  };
};

export const useAdminCustomersData = () => {
  const { greeting, subtitle, menu } = useAdminPanelData();
  const { enqueueSnackbar } = useSnackbar();
  const [kpis, setKpis] = useState<IAdminCustomerKpiItem[]>(ADMIN_CUSTOMER_KPIS);
  const [customers, setCustomers] = useState<IAdminCustomerItem[]>(ADMIN_CUSTOMERS);
  const [totalCustomers, setTotalCustomers] = useState(ADMIN_CUSTOMERS.length);
  const [totalPages, setTotalPages] = useState(
    Math.max(1, Math.ceil(ADMIN_CUSTOMERS.length / ADMIN_CUSTOMERS_PAGE_SIZE))
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [customerToDelete, setCustomerToDelete] = useState<IAdminCustomerItem | null>(null);
  const [customerToMessage, setCustomerToMessage] = useState<IAdminCustomerItem | null>(null);
  const [isDeletingCustomer, setIsDeletingCustomer] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadKpis = async () => {
      try {
        const response = await adminCustomersService.getKpis(controller.signal);
        if (!controller.signal.aborted) setKpis(mapCustomerKpis(response));
      } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ERR_CANCELED') return;
      }
    };

    void loadKpis();

    return () => controller.abort();
  }, [reloadKey]);

  useEffect(() => {
    const controller = new AbortController();

    const loadCustomers = async () => {
      setIsLoadingCustomers(true);

      try {
        const response = await adminCustomersService.getCustomers(
          {
            page: currentPage,
            size: ADMIN_CUSTOMERS_PAGE_SIZE,
            search: searchQuery.trim() || undefined,
            sort: 'createdAt_desc',
          },
          controller.signal
        );

        if (controller.signal.aborted) return;

        setCustomers(response.content.map(mapCustomerRow));
        setTotalCustomers(response.totalElements);
        setTotalPages(Math.max(1, response.totalPages));
      } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ERR_CANCELED') return;
      } finally {
        if (!controller.signal.aborted) setIsLoadingCustomers(false);
      }
    };

    void loadCustomers();

    return () => controller.abort();
  }, [currentPage, reloadKey, searchQuery]);

  const onSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  const goToPreviousCustomerPage = useCallback(() => {
    setCurrentPage((page) => Math.max(1, page - 1));
  }, []);

  const goToNextCustomerPage = useCallback(() => {
    setCurrentPage((page) => Math.min(totalPages, page + 1));
  }, [totalPages]);

  const requestCustomerDelete = useCallback((customer: IAdminCustomerItem) => {
    setCustomerToDelete(customer);
  }, []);

  const closeCustomerDeleteConfirmation = useCallback(() => {
    if (!isDeletingCustomer) setCustomerToDelete(null);
  }, [isDeletingCustomer]);

  const deleteCustomer = useCallback(async () => {
    if (!customerToDelete) return;

    setIsDeletingCustomer(true);

    try {
      await adminCustomersService.deleteCustomer(Number(customerToDelete.id));
      enqueueSnackbar('Customer deleted.', { variant: 'success' });
      setCustomerToDelete(null);
      setReloadKey((key) => key + 1);
    } catch (error) {
      enqueueSnackbar(toErrorMessage(error, 'Failed to delete customer.'), { variant: 'error' });
    } finally {
      setIsDeletingCustomer(false);
    }
  }, [customerToDelete, enqueueSnackbar]);

  const openCustomerMessageModal = useCallback((customer: IAdminCustomerItem) => {
    setCustomerToMessage(customer);
  }, []);

  const closeCustomerMessageModal = useCallback(() => {
    setCustomerToMessage(null);
  }, []);

  const sendCustomerMessage = useCallback(
    (message: string) => {
      if (!customerToMessage) return;

      setCustomerToMessage(null);
      enqueueSnackbar(`Message prepared for ${customerToMessage.email}.`, { variant: 'success' });
      void message;
    },
    [customerToMessage, enqueueSnackbar]
  );

  return useMemo(
    () => ({
      greeting,
      subtitle,
      menu,
      kpis,
      customers,
      totalCustomers,
      currentPage,
      totalPages,
      isFirstPage: currentPage === 1,
      isLastPage: currentPage >= totalPages,
      isLoadingCustomers,
      customerToDelete,
      customerToMessage,
      isDeletingCustomer,
      searchQuery,
      onSearchChange,
      goToPreviousCustomerPage,
      goToNextCustomerPage,
      requestCustomerDelete,
      closeCustomerDeleteConfirmation,
      deleteCustomer,
      openCustomerMessageModal,
      closeCustomerMessageModal,
      sendCustomerMessage,
    }),
    [
      closeCustomerDeleteConfirmation,
      closeCustomerMessageModal,
      currentPage,
      customers,
      customerToDelete,
      customerToMessage,
      deleteCustomer,
      goToNextCustomerPage,
      goToPreviousCustomerPage,
      greeting,
      isDeletingCustomer,
      isLoadingCustomers,
      kpis,
      menu,
      onSearchChange,
      openCustomerMessageModal,
      requestCustomerDelete,
      searchQuery,
      sendCustomerMessage,
      subtitle,
      totalCustomers,
      totalPages,
    ]
  );
};
