import { useMemo, useState } from 'react';
import { Typography } from '@mui/material';

import { useAdminSalesAnalytics } from '@/core/hooks';
import type { AdminAnalyticsRange } from '@/core/types';
import {
  buildAdminSalesChartModel,
  formatAdminChartOrdersValue,
  formatAdminChartRevenueValue,
  type IAdminSalesChartDot,
} from '@/core/utils';

import { AdminSalesChartLegend } from './AdminSalesChartLegend';
import { AdminSalesChartSvg } from './AdminSalesChartSvg';

import './AdminPanelSalesChart.css';

interface ISalesChartTooltip {
  x: number;
  y: number;
  label: string;
  revenue: number;
  orders: number;
}

export const AdminPanelSalesChart = () => {
  const [activePeriod, setActivePeriod] = useState<AdminAnalyticsRange>('week');
  const [tooltip, setTooltip] = useState<ISalesChartTooltip | null>(null);
  const { points, isLoading, isFallbackData } = useAdminSalesAnalytics(activePeriod);

  const chartModel = useMemo(() => buildAdminSalesChartModel(points), [points]);

  const handleDotEnter = (dot: IAdminSalesChartDot) => {
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

        <AdminSalesChartLegend activePeriod={activePeriod} onPeriodChange={setActivePeriod} />
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
            <span>Revenue: {formatAdminChartRevenueValue(tooltip.revenue)}</span>
            <span>Orders: {formatAdminChartOrdersValue(tooltip.orders)}</span>
          </div>
        ) : null}

        <div className="admin-panel-sales-chart__graph-scroll">
          <AdminSalesChartSvg
            chartModel={chartModel}
            onDotEnter={handleDotEnter}
            onMouseLeave={() => setTooltip(null)}
          />
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
