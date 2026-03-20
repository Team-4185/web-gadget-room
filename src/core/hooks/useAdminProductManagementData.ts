import { useMemo } from 'react';

import { ADMIN_PANEL_MANAGED_PRODUCTS } from '@/core/constants';
import { useAdminPanelData } from './useAdminPanelData';

export const useAdminProductManagementData = () => {
  const { greeting, subtitle, menu } = useAdminPanelData();

  return useMemo(
    () => ({
      greeting,
      subtitle,
      menu,
      products: ADMIN_PANEL_MANAGED_PRODUCTS,
      totalProducts: 100,
    }),
    [greeting, menu, subtitle]
  );
};
