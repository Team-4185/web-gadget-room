import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import { ADMIN_SALES_ANALYTICS_MOCK } from '@/core/constants';
import { adminDashboardService, type AdminDashboardSalesPoint } from '@/core/services';
import type { AdminAnalyticsRange, IAdminSalesAnalyticsPoint } from '@/core/types';
import { isDemoFallbackEnabled } from '@/core/utils';

const PERIOD_COUNT = 7;

const getMonthKey = (date: Date) => `${date.getFullYear()}-${date.getMonth()}`;
const getYearKey = (date: Date) => String(date.getFullYear());

const getDateKey = (date: Date) =>
  new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);

const getWeekStartDate = (date: Date) => {
  const startDate = new Date(date);
  const day = startDate.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  startDate.setDate(startDate.getDate() + mondayOffset);
  startDate.setHours(0, 0, 0, 0);

  return startDate;
};

const getWeekKey = (date: Date) => getDateKey(getWeekStartDate(date));

const formatWeekLabel = (date: Date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
  }).format(date);

const formatMonthLabel = (date: Date) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
  }).format(date);

const formatYearLabel = (date: Date) => String(date.getFullYear());

const parsePointDate = (dateValue: string) => {
  const date = new Date(dateValue);
  return Number.isNaN(date.getTime()) ? null : date;
};

const getAnchorDate = (points: AdminDashboardSalesPoint[]) =>
  points.reduce<Date | null>((latestDate, point) => {
    const date = parsePointDate(point.date);
    if (!date) return latestDate;
    if (!latestDate || date.getTime() > latestDate.getTime()) return date;
    return latestDate;
  }, null) ?? new Date();

const buildEmptyRangePoints = (anchorDate: Date, range: AdminAnalyticsRange) =>
  Array.from({ length: PERIOD_COUNT }, (_, index) => {
    const offset = PERIOD_COUNT - 1 - index;

    if (range === 'week') {
      const date = getWeekStartDate(anchorDate);
      date.setDate(date.getDate() - offset * 7);

      return { key: getWeekKey(date), label: formatWeekLabel(date), revenue: 0, orders: 0 };
    }

    if (range === 'month') {
      const date = new Date(anchorDate.getFullYear(), anchorDate.getMonth() - offset, 1);

      return { key: getMonthKey(date), label: formatMonthLabel(date), revenue: 0, orders: 0 };
    }

    const date = new Date(anchorDate.getFullYear() - offset, 0, 1);

    return { key: getYearKey(date), label: formatYearLabel(date), revenue: 0, orders: 0 };
  });

const getPointPeriodKey = (date: Date, range: AdminAnalyticsRange) => {
  if (range === 'week') return getWeekKey(date);
  if (range === 'month') return getMonthKey(date);
  return getYearKey(date);
};

const mapSalesPoints = (
  points: AdminDashboardSalesPoint[],
  range: AdminAnalyticsRange
): IAdminSalesAnalyticsPoint[] => {
  const rangePoints = buildEmptyRangePoints(getAnchorDate(points), range);
  const rangePointByKey = new Map(rangePoints.map((point) => [point.key, point]));

  points.forEach((point) => {
    const date = parsePointDate(point.date);
    if (!date) return;

    const rangePoint = rangePointByKey.get(getPointPeriodKey(date, range));
    if (!rangePoint) return;

    rangePoint.revenue += point.revenue;
    rangePoint.orders += point.ordersCount;
  });

  return rangePoints.map(({ label, revenue, orders }) => ({
    label,
    revenue,
    orders,
  }));
};

export const useAdminSalesAnalytics = (range: AdminAnalyticsRange) => {
  const demoFallbackEnabled = isDemoFallbackEnabled();
  const [apiPoints, setApiPoints] = useState<AdminDashboardSalesPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFallbackData, setIsFallbackData] = useState(demoFallbackEnabled);

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
        setIsFallbackData(demoFallbackEnabled);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadSalesAnalytics();

    return () => controller.abort();
  }, [demoFallbackEnabled]);

  const points = useMemo<IAdminSalesAnalyticsPoint[]>(
    () =>
      isFallbackData && demoFallbackEnabled
        ? ADMIN_SALES_ANALYTICS_MOCK[range]
        : mapSalesPoints(apiPoints, range),
    [apiPoints, demoFallbackEnabled, isFallbackData, range]
  );

  return {
    points,
    isLoading,
    isFallbackData,
  };
};
