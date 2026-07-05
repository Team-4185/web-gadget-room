export const formatAdminDashboardCurrency = (value: number) =>
  `$ ${value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export const formatAdminDashboardNumber = (value: number) => value.toLocaleString('en-US');

export const formatAdminDashboardTrend = (value: number | null) => {
  if (value === null) return '0%';

  const prefix = value > 0 ? '+' : '';
  return `${prefix}${value}%`;
};

export const isPositiveAdminDashboardTrend = (value: number | null) => value === null || value >= 0;

export const formatAdminDashboardOrderAge = (createdAt: string) => {
  const createdTime = new Date(createdAt).getTime();

  if (Number.isNaN(createdTime)) return '';

  const minutes = Math.max(0, Math.floor((Date.now() - createdTime) / 60000));
  if (minutes < 1) return 'now';
  if (minutes < 60) return `${minutes} min`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} h`;

  return `${Math.floor(hours / 24)} d`;
};
