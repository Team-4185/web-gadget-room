import { useMemo, useState } from 'react';
import { Typography } from '@mui/material';

import { useAdminSalesAnalytics } from '@/core/hooks';
import type { AdminAnalyticsRange, IAdminSalesAnalyticsPoint } from '@/core/types';
import { Button } from '@/components/ui';

import './AdminPanelSalesChart.css';

const PERIOD_OPTIONS: { id: AdminAnalyticsRange; label: string }[] = [
  { id: 'week', label: 'Week' },
  { id: 'month', label: 'Month' },
  { id: 'year', label: 'Year' },
];

const CHART = {
  viewBoxWidth: 560,
  viewBoxHeight: 320,
  left: 76,
  right: 516,
  top: 10,
  bottom: 280,
  gridLines: 5,
};

const formatValue = (value: number) => new Intl.NumberFormat('en-US').format(Math.round(value));
const formatRevenueTick = (value: string) => `$${value}`;
const formatRevenueValue = (value: number) => `$${formatValue(value)}`;
const formatOrdersValue = (value: number) => formatValue(value);

interface ISalesChartTooltip {
  x: number;
  y: number;
  label: string;
  revenue: number;
  orders: number;
}

interface IChartDot {
  cx: number;
  cy: number;
  index: number;
  key: string;
}

interface IYAxisLabel {
  id: string;
  y: number;
  value: string;
}

interface IXAxisLabel {
  id: string;
  x: number;
  value: string;
}

interface IChartModel {
  points: IAdminSalesAnalyticsPoint[];
  revenueLine: string;
  ordersLine: string;
  yAxisLabels: IYAxisLabel[];
  xAxisLabels: IXAxisLabel[];
  revenueDots: IChartDot[];
  ordersDots: IChartDot[];
}

const EMPTY_CHART_MODEL: IChartModel = {
  points: [],
  revenueLine: '',
  ordersLine: '',
  yAxisLabels: [],
  xAxisLabels: [],
  revenueDots: [],
  ordersDots: [],
};

const toPolyline = (dots: Pick<IChartDot, 'cx' | 'cy'>[]) =>
  dots.map((dot) => `${dot.cx},${dot.cy}`).join(' ');

const buildChartModel = (points: IAdminSalesAnalyticsPoint[]): IChartModel => {
  if (!points.length) return EMPTY_CHART_MODEL;

  const values = points.flatMap((point) => [point.revenue, point.orders]);
  const maxRaw = Math.max(...values, 1);
  const maxValue = Math.ceil(maxRaw * 1.1);
  const rangeY = CHART.bottom - CHART.top;
  const rangeX = CHART.right - CHART.left;
  const stepX = points.length > 1 ? rangeX / (points.length - 1) : 0;

  const toY = (value: number) => CHART.bottom - (value / maxValue) * rangeY;

  const revenueDots: IChartDot[] = points.map((point, index) => ({
    key: `${point.label}-revenue`,
    cx: CHART.left + index * stepX,
    cy: toY(point.revenue),
    index,
  }));

  const ordersDots: IChartDot[] = points.map((point, index) => ({
    key: `${point.label}-orders`,
    cx: CHART.left + index * stepX,
    cy: toY(point.orders),
    index,
  }));

  const yAxisLabels: IYAxisLabel[] = Array.from({ length: CHART.gridLines + 1 }, (_, index) => {
    const value = (maxValue / CHART.gridLines) * (CHART.gridLines - index);
    const y = CHART.top + (rangeY / CHART.gridLines) * index;

    return {
      id: `y-${index}`,
      y,
      value: formatValue(value),
    };
  });
  const xAxisLabels: IXAxisLabel[] = points.map((point, index) => ({
    id: `x-${point.label}-${index}`,
    x: CHART.left + index * stepX,
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

export const AdminPanelSalesChart = () => {
  const [activePeriod, setActivePeriod] = useState<AdminAnalyticsRange>('week');
  const [tooltip, setTooltip] = useState<ISalesChartTooltip | null>(null);
  const { points, isLoading, isFallbackData } = useAdminSalesAnalytics(activePeriod);

  const chartModel = useMemo(() => buildChartModel(points), [points]);

  const handleDotEnter = (dot: IChartDot) => {
    const point = chartModel.points[dot.index];
    if (!point) return;

    setTooltip({
      x: dot.cx + 18,
      y: dot.cy - 10,
      label: point.label,
      revenue: point.revenue,
      orders: point.orders,
    });
  };

  return (
    <section className="admin-panel-sales-chart" aria-label="Sales analytics chart">
      <div className="admin-panel-sales-chart__head">
        <div>
          <Typography component="h3" sx={{ fontSize: '20px', fontWeight: 600, lineHeight: 1 }}>
            Sales Analytics
          </Typography>
          <Typography variant="body2" component="p" sx={{ marginTop: '6px' }}>
            Revenue and orders for the period
          </Typography>
        </div>

        <div className="admin-panel-sales-chart__filters">
          {PERIOD_OPTIONS.map((option) => (
            <Button
              maxWidth="60px"
              height="34px"
              key={option.id}
              type="button"
              border="none"
              borderRadius="12px"
              sx={{ fontSize: '15px', fontWeight: 500 }}
              className={activePeriod === option.id ? 'is-active' : ''}
              onClick={() => setActivePeriod(option.id)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {isFallbackData ? (
        <Typography variant="body2" component="p" className="admin-panel-sales-chart__caption">
          Demo data shown. Chart will switch to backend data when API responds.
        </Typography>
      ) : null}

      <div className="admin-panel-sales-chart__graph">
        {tooltip ? (
          <div
            className="admin-panel-sales-chart__tooltip"
            style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
          >
            <span className="admin-panel-sales-chart__tooltip-title">{tooltip.label}</span>
            <span>Revenue: {formatRevenueValue(tooltip.revenue)}</span>
            <span>Orders: {formatOrdersValue(tooltip.orders)}</span>
          </div>
        ) : null}

        <div className="admin-panel-sales-chart__graph-scroll">
          <svg
            viewBox={`0 0 ${CHART.viewBoxWidth} ${CHART.viewBoxHeight}`}
            role="img"
            aria-label="Sales trend lines"
            onMouseLeave={() => setTooltip(null)}
          >
            <g stroke="rgba(119, 119, 191, 0.22)" strokeWidth="1">
              {chartModel.yAxisLabels.map((line) => (
                <line key={line.id} x1={CHART.left} y1={line.y} x2={CHART.right} y2={line.y} />
              ))}
              {chartModel.xAxisLabels.map((line) => (
                <line key={line.id} x1={line.x} y1={CHART.top} x2={line.x} y2={CHART.bottom} />
              ))}
            </g>

            <g className="admin-panel-sales-chart__y-labels">
              {chartModel.yAxisLabels.map((line) => (
                <text key={`label-${line.id}`} x={CHART.left - 8} y={line.y + 4} textAnchor="end">
                  {formatRevenueTick(line.value)}
                </text>
              ))}
            </g>

            <g className="admin-panel-sales-chart__x-labels-svg">
              {chartModel.xAxisLabels.map((label) => (
                <text
                  key={`label-${label.id}`}
                  x={label.x}
                  y={CHART.bottom + 20}
                  textAnchor="middle"
                >
                  {label.value}
                </text>
              ))}
            </g>

            {chartModel.revenueLine ? (
              <polyline
                fill="none"
                stroke="#6b6b6b"
                strokeWidth="2"
                points={chartModel.revenueLine}
              />
            ) : null}

            <g fill="#f5a7a0" stroke="#f5a7a0">
              {chartModel.revenueDots.map((dot) => (
                <circle
                  key={dot.key}
                  cx={dot.cx}
                  cy={dot.cy}
                  r="4"
                  className="admin-panel-sales-chart__point"
                  onMouseEnter={() => handleDotEnter(dot)}
                />
              ))}
            </g>
          </svg>
        </div>
      </div>

      {isLoading ? (
        <div className="admin-panel-sales-chart__meta">
          <span className="admin-panel-sales-chart__loading">Updating chart...</span>
        </div>
      ) : null}
    </section>
  );
};
