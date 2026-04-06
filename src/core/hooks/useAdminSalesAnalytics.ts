import { useMemo } from 'react';

import { ADMIN_SALES_ANALYTICS_MOCK } from '@/core/constants';
import type { AdminAnalyticsRange, IAdminSalesAnalyticsPoint } from '@/core/types';

export const useAdminSalesAnalytics = (range: AdminAnalyticsRange) => {
  const points = useMemo<IAdminSalesAnalyticsPoint[]>(() => ADMIN_SALES_ANALYTICS_MOCK[range], [range]);

  return {
    points,
    isLoading: false,
    isFallbackData: true,
  };
};
