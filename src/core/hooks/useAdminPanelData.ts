import { useMemo } from 'react';

import {
  ADMIN_PANEL_BRANDS,
  ADMIN_PANEL_LOW_STOCK,
  ADMIN_PANEL_MENU,
  ADMIN_PANEL_PRODUCTS,
  ADMIN_PANEL_RECENT_ORDERS,
  ADMIN_PANEL_STATS,
} from '@/core/constants';
import { useAppSelector } from '@/core/store';

export const useAdminPanelData = () => {
  const email = useAppSelector((state) => state.auth.email);

  return useMemo(() => {
    return {
      greeting: `Welcome, Team!`,
      subtitle: "Here's what's happening in your store today",
      menu: ADMIN_PANEL_MENU,
      stats: ADMIN_PANEL_STATS,
      brands: ADMIN_PANEL_BRANDS,
      topProducts: ADMIN_PANEL_PRODUCTS,
      recentOrders: ADMIN_PANEL_RECENT_ORDERS,
      lowStock: ADMIN_PANEL_LOW_STOCK,
    };
  }, [email]);
};
