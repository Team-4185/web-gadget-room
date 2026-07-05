import { api } from '@/core/config';
import type { AdminAnalyticsRange } from '@/core/types';
import {
  normalizeAdminSalesAnalyticsResponse,
  type IAdminSalesAnalyticsApiPoint,
  type IAdminSalesAnalyticsApiResponse,
} from '@/core/utils';

export const adminAnalyticsService = {
  async getSalesAnalytics(range: AdminAnalyticsRange, signal?: AbortSignal) {
    const { data } = await api.get<
      IAdminSalesAnalyticsApiResponse | IAdminSalesAnalyticsApiPoint[]
    >('/api/v1/admin/analytics/sales', { params: { range }, signal });

    return normalizeAdminSalesAnalyticsResponse(data);
  },
};
