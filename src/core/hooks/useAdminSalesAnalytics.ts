import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import { ADMIN_SALES_ANALYTICS_MOCK } from '@/core/constants';
import { adminDashboardService, type AdminDashboardSalesPoint } from '@/core/services';
import type { AdminAnalyticsRange, IAdminSalesAnalyticsPoint } from '@/core/types';

const formatDateLabel = (dateValue: string, range: AdminAnalyticsRange) => {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) return dateValue;

  if (range === 'year') {
    return new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
  }

  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
  }).format(date);
};

const getRangePoints = (points: AdminDashboardSalesPoint[], range: AdminAnalyticsRange) => {
  if (range === 'week') return points.slice(-7);
  if (range === 'month') return points.slice(-30);

  return points;
};

const mapSalesPoints = (
  points: AdminDashboardSalesPoint[],
  range: AdminAnalyticsRange
): IAdminSalesAnalyticsPoint[] =>
  getRangePoints(points, range).map((point) => ({
    label: formatDateLabel(point.date, range),
    revenue: point.revenue,
    orders: point.ordersCount,
  }));

export const useAdminSalesAnalytics = (range: AdminAnalyticsRange) => {
  const [apiPoints, setApiPoints] = useState<AdminDashboardSalesPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFallbackData, setIsFallbackData] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const loadSalesAnalytics = async () => {
      setIsLoading(true);

      try {
        const data = await adminDashboardService.getSalesAnalytics(controller.signal);

        if (controller.signal.aborted) return;

        setApiPoints(data);
        setIsFallbackData(false);
      } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ERR_CANCELED') return;

        setApiPoints([]);
        setIsFallbackData(true);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadSalesAnalytics();

    return () => controller.abort();
  }, []);

  const points = useMemo<IAdminSalesAnalyticsPoint[]>(
    () => (isFallbackData ? ADMIN_SALES_ANALYTICS_MOCK[range] : mapSalesPoints(apiPoints, range)),
    [apiPoints, isFallbackData, range]
  );

  return {
    points,
    isLoading,
    isFallbackData,
  };
};
