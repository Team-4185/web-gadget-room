import type { IAdminSalesAnalyticsPoint } from '@/core/types';

export interface IAdminSalesAnalyticsApiPoint {
  date?: string;
  label?: string;
  revenue?: number | string;
  orders?: number | string;
}

export interface IAdminSalesAnalyticsApiResponse {
  points?: IAdminSalesAnalyticsApiPoint[];
}

const formatDateLabel = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
  }).format(date);
};

const toNumber = (value: number | string | undefined) => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};

const normalizePoint = (
  point: IAdminSalesAnalyticsApiPoint,
  index: number
): IAdminSalesAnalyticsPoint => {
  const fallbackLabel = `Point ${index + 1}`;

  return {
    label: point.label ?? (point.date ? formatDateLabel(point.date) : fallbackLabel),
    revenue: toNumber(point.revenue),
    orders: toNumber(point.orders),
  };
};

export const normalizeAdminSalesAnalyticsResponse = (
  payload: IAdminSalesAnalyticsApiResponse | IAdminSalesAnalyticsApiPoint[]
): IAdminSalesAnalyticsPoint[] => {
  const source = Array.isArray(payload) ? payload : payload.points ?? [];

  return source.map((point, index) => normalizePoint(point, index));
};
