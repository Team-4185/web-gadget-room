import type { IAdminSalesAnalyticsPoint } from '@/core/types';

export const ADMIN_SALES_CHART = {
  viewBoxWidth: 560,
  viewBoxHeight: 320,
  left: 76,
  right: 516,
  top: 10,
  bottom: 280,
  gridLines: 5,
};

export interface IAdminSalesChartDot {
  cx: number;
  cy: number;
  index: number;
  key: string;
}

interface IAdminSalesChartYAxisLabel {
  id: string;
  y: number;
  value: string;
}

interface IAdminSalesChartXAxisLabel {
  id: string;
  x: number;
  value: string;
}

export interface IAdminSalesChartModel {
  points: IAdminSalesAnalyticsPoint[];
  revenueLine: string;
  ordersLine: string;
  yAxisLabels: IAdminSalesChartYAxisLabel[];
  xAxisLabels: IAdminSalesChartXAxisLabel[];
  revenueDots: IAdminSalesChartDot[];
  ordersDots: IAdminSalesChartDot[];
}

export const formatAdminChartValue = (value: number) =>
  new Intl.NumberFormat('en-US').format(Math.round(value));

export const formatAdminChartRevenueTick = (value: string) => `$${value}`;

export const formatAdminChartRevenueValue = (value: number) => `$${formatAdminChartValue(value)}`;

export const formatAdminChartOrdersValue = (value: number) => formatAdminChartValue(value);

const EMPTY_ADMIN_SALES_CHART_MODEL: IAdminSalesChartModel = {
  points: [],
  revenueLine: '',
  ordersLine: '',
  yAxisLabels: [],
  xAxisLabels: [],
  revenueDots: [],
  ordersDots: [],
};

const toPolyline = (dots: Pick<IAdminSalesChartDot, 'cx' | 'cy'>[]) =>
  dots.map((dot) => `${dot.cx},${dot.cy}`).join(' ');

export const buildAdminSalesChartModel = (
  points: IAdminSalesAnalyticsPoint[]
): IAdminSalesChartModel => {
  if (!points.length) return EMPTY_ADMIN_SALES_CHART_MODEL;

  const values = points.flatMap((point) => [point.revenue, point.orders]);
  const maxRaw = Math.max(...values, 1);
  const maxValue = Math.ceil(maxRaw * 1.1);
  const rangeY = ADMIN_SALES_CHART.bottom - ADMIN_SALES_CHART.top;
  const rangeX = ADMIN_SALES_CHART.right - ADMIN_SALES_CHART.left;
  const stepX = points.length > 1 ? rangeX / (points.length - 1) : 0;

  const toY = (value: number) => ADMIN_SALES_CHART.bottom - (value / maxValue) * rangeY;

  const revenueDots: IAdminSalesChartDot[] = points.map((point, index) => ({
    key: `${point.label}-revenue`,
    cx: ADMIN_SALES_CHART.left + index * stepX,
    cy: toY(point.revenue),
    index,
  }));

  const ordersDots: IAdminSalesChartDot[] = points.map((point, index) => ({
    key: `${point.label}-orders`,
    cx: ADMIN_SALES_CHART.left + index * stepX,
    cy: toY(point.orders),
    index,
  }));

  const yAxisLabels = Array.from({ length: ADMIN_SALES_CHART.gridLines + 1 }, (_, index) => {
    const value = (maxValue / ADMIN_SALES_CHART.gridLines) * (ADMIN_SALES_CHART.gridLines - index);
    const y = ADMIN_SALES_CHART.top + (rangeY / ADMIN_SALES_CHART.gridLines) * index;

    return {
      id: `y-${index}`,
      y,
      value: formatAdminChartValue(value),
    };
  });

  const xAxisLabels = points.map((point, index) => ({
    id: `x-${point.label}-${index}`,
    x: ADMIN_SALES_CHART.left + index * stepX,
    value: point.label,
  }));

  return {
    points,
    revenueLine: toPolyline(revenueDots),
    ordersLine: toPolyline(ordersDots),
    yAxisLabels,
    xAxisLabels,
    revenueDots,
    ordersDots,
  };
};
