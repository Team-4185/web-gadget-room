import { useEffect, useState } from 'react';
import axios from 'axios';

import { ADMIN_SALES_ANALYTICS_MOCK } from '@/core/constants';
import { adminAnalyticsService } from '@/core/services/adminAnalytics';
import type { AdminAnalyticsRange, IAdminSalesAnalyticsPoint } from '@/core/types';

export const useAdminSalesAnalytics = (range: AdminAnalyticsRange) => {
  const [points, setPoints] = useState<IAdminSalesAnalyticsPoint[]>(ADMIN_SALES_ANALYTICS_MOCK.week);
  const [isLoading, setIsLoading] = useState(true);
  const [isFallbackData, setIsFallbackData] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      setIsLoading(true);

      try {
        const response = await adminAnalyticsService.getSalesAnalytics(range, controller.signal);

        if (!response.length) {
          setPoints(ADMIN_SALES_ANALYTICS_MOCK[range]);
          setIsFallbackData(true);
          return;
        }

        setPoints(response);
        setIsFallbackData(false);
      } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ERR_CANCELED') return;

        setPoints(ADMIN_SALES_ANALYTICS_MOCK[range]);
        setIsFallbackData(true);
      } finally {
        setIsLoading(false);
      }
    };

    load();

    return () => controller.abort();
  }, [range]);

  return { points, isLoading, isFallbackData };
};
