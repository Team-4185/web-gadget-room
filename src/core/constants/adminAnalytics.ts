import type { AdminAnalyticsRange, IAdminSalesAnalyticsPoint } from '@/core/types';

export const ADMIN_SALES_ANALYTICS_MOCK: Record<AdminAnalyticsRange, IAdminSalesAnalyticsPoint[]> =
  {
    week: [
      { label: '1 Oct', revenue: 6400, orders: 22 },
      { label: '8 Oct', revenue: 6600, orders: 25 },
      { label: '15 Oct', revenue: 11200, orders: 40 },
      { label: '22 Oct', revenue: 11400, orders: 45 },
      { label: '29 Oct', revenue: 11000, orders: 47 },
      { label: '5 Nov', revenue: 11300, orders: 35 },
      { label: '12 Nov', revenue: 8300, orders: 34 },
    ],
    month: [
      { label: 'Jan', revenue: 29200, orders: 122 },
      { label: 'Feb', revenue: 30400, orders: 134 },
      { label: 'Mar', revenue: 34100, orders: 150 },
      { label: 'Apr', revenue: 32700, orders: 142 },
      { label: 'May', revenue: 35900, orders: 162 },
      { label: 'Jun', revenue: 37200, orders: 170 },
    ],
    year: [
      { label: '2021', revenue: 264000, orders: 1150 },
      { label: '2022', revenue: 312000, orders: 1320 },
      { label: '2023', revenue: 356000, orders: 1510 },
      { label: '2024', revenue: 402000, orders: 1660 },
      { label: '2025', revenue: 438000, orders: 1810 },
    ],
  };
