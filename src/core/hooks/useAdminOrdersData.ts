import { useMemo } from 'react';

import { ADMIN_MANAGED_ORDERS, ADMIN_ORDER_KPIS } from '@/core/constants';
import { useAdminPanelData } from './useAdminPanelData';

export const useAdminOrdersData = () => {
  const { greeting, subtitle, menu } = useAdminPanelData();

  return useMemo(
    () => ({
      greeting,
      subtitle,
      menu,
      kpis: ADMIN_ORDER_KPIS,
      orders: ADMIN_MANAGED_ORDERS,
      totalOrders: 100,
    }),
    [greeting, menu, subtitle]
  );
};
