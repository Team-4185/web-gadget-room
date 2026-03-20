import { useMemo } from 'react';

import { ADMIN_CUSTOMERS, ADMIN_CUSTOMER_KPIS } from '@/core/constants';
import { useAdminPanelData } from './useAdminPanelData';

export const useAdminCustomersData = () => {
  const { greeting, subtitle, menu } = useAdminPanelData();

  return useMemo(
    () => ({
      greeting,
      subtitle,
      menu,
      kpis: ADMIN_CUSTOMER_KPIS,
      customers: ADMIN_CUSTOMERS,
      totalCustomers: 100,
    }),
    [greeting, menu, subtitle]
  );
};
