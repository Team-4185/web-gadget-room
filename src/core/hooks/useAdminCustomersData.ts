import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import { ADMIN_CUSTOMERS, ADMIN_CUSTOMER_KPIS } from '@/core/constants';
import { ArrowRightUp, Customers, Dollar, Star } from '@/assets';
import { adminCustomersService } from '@/core/services';
import type { ApiAdminCustomerKpi, IAdminCustomerKpiItem } from '@/core/types';
import { useAdminPanelData } from './useAdminPanelData';

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

export const useAdminCustomersData = () => {
  const { greeting, subtitle, menu } = useAdminPanelData();
  const [kpis, setKpis] = useState<IAdminCustomerKpiItem[]>(ADMIN_CUSTOMER_KPIS);

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
  }, []);

  return useMemo(
    () => ({
      greeting,
      subtitle,
      menu,
      kpis,
      customers: ADMIN_CUSTOMERS,
      totalCustomers: 100,
    }),
    [greeting, kpis, menu, subtitle]
  );
};
