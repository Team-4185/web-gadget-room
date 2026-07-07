import type { AdminAnalyticsRange } from '@/core/types';
import { Button } from '@/components/ui';

const PERIOD_OPTIONS: { id: AdminAnalyticsRange; label: string }[] = [
  { id: 'week', label: 'Week' },
  { id: 'month', label: 'Month' },
  { id: 'year', label: 'Year' },
];

interface IAdminSalesChartLegendProps {
  activePeriod: AdminAnalyticsRange;
  onPeriodChange: (period: AdminAnalyticsRange) => void;
}

export const AdminSalesChartLegend = ({
  activePeriod,
  onPeriodChange,
}: IAdminSalesChartLegendProps) => (
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
        onClick={() => onPeriodChange(option.id)}
      >
        {option.label}
      </Button>
    ))}
  </div>
);
