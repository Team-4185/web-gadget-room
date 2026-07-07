import {
  ADMIN_PANEL_BRANDS,
  ADMIN_PANEL_MENU,
  ADMIN_PANEL_STATS,
  ADMIN_PRODUCT_STATUS_LABELS,
  FALLBACK_IMAGE,
} from '@/core/constants';
import { Customers, Dollar, Order, Product } from '@/assets';
import {
  phonesService,
  type AdminDashboardBrandSale,
  type AdminDashboardLowStockProduct,
  type AdminDashboardRecentOrder,
  type AdminDashboardSummary,
  type AdminDashboardTopProduct,
} from '@/core/services';
import type {
  AdminOrderStatus,
  ApiAdminSidebarCounters,
  IAdminPanelBrandItem,
  IAdminPanelLowStockItem,
  IAdminPanelMenuItem,
  IAdminPanelOrderItem,
  IAdminPanelProductItem,
  IAdminPanelStatItem,
} from '@/core/types';
import { formatProductDisplayName } from './products';
import {
  formatAdminDashboardCurrency,
  formatAdminDashboardNumber,
  formatAdminDashboardOrderAge,
  formatAdminDashboardTrend,
  isPositiveAdminDashboardTrend,
} from './adminDashboardFormatters';

const BRAND_COLORS = [
  'var(--chart-brand-apple)',
  'var(--chart-brand-samsung)',
  'var(--chart-brand-xiaomi)',
  'var(--chart-brand-google)',
  'var(--chart-brand-other)',
];

export const DASHBOARD_SIDE_LIST_LIMIT = 3;

export const mapApiStatusToFrontendStatus = (status: string): AdminOrderStatus => {
  switch (status) {
    case 'NEW':
      return 'new';
    case 'CONFIRMED':
      return 'confirmed';
    case 'PROCESSING':
      return 'processing';
    case 'SHIPPED':
      return 'shipped';
    case 'CANCELLED':
      return 'cancelled';
    case 'DELIVERED':
    default:
      return 'delivered';
  }
};

export const mapSummaryToStats = (summary: AdminDashboardSummary): IAdminPanelStatItem[] => [
  {
    id: 'revenue',
    title: 'Total revenue',
    value: formatAdminDashboardCurrency(summary.totalRevenue),
    subtitle: 'Over the last 30 days',
    trend: formatAdminDashboardTrend(summary.totalRevenueChangePercent),
    isPositive: isPositiveAdminDashboardTrend(summary.totalRevenueChangePercent),
    icon: Dollar,
  },
  {
    id: 'orders',
    title: 'Total orders',
    value: formatAdminDashboardNumber(summary.totalOrders),
    subtitle: `${formatAdminDashboardNumber(summary.processingOrders)} in processing`,
    trend: formatAdminDashboardTrend(summary.totalOrdersChangePercent),
    isPositive: isPositiveAdminDashboardTrend(summary.totalOrdersChangePercent),
    icon: Order,
  },
  {
    id: 'stock',
    title: 'Items in stock',
    value: formatAdminDashboardNumber(summary.itemsInStock),
    subtitle: `${formatAdminDashboardNumber(summary.lowStockProducts)} running low`,
    trend: formatAdminDashboardTrend(summary.itemsInStockChangePercent),
    isPositive: isPositiveAdminDashboardTrend(summary.itemsInStockChangePercent),
    icon: Product,
  },
  {
    id: 'clients',
    title: 'New clients',
    value: formatAdminDashboardNumber(summary.newClients),
    subtitle: 'This month',
    trend: formatAdminDashboardTrend(summary.newClientsChangePercent),
    isPositive: isPositiveAdminDashboardTrend(summary.newClientsChangePercent),
    icon: Customers,
  },
];

export const getEmptyStats = (): IAdminPanelStatItem[] =>
  ADMIN_PANEL_STATS.map((item) => ({
    ...item,
    value: '-',
    subtitle: '',
    trend: '0%',
    isPositive: true,
  }));

export const mapBrandSales = (
  items: AdminDashboardBrandSale[],
  useFallbackData: boolean
): IAdminPanelBrandItem[] => {
  const totalUnitsSold = items.reduce((sum, item) => sum + item.unitsSold, 0);

  if (!totalUnitsSold) return useFallbackData ? ADMIN_PANEL_BRANDS : [];

  const sortedItems = [...items].sort((a, b) => b.unitsSold - a.unitsSold);
  const topBrands = sortedItems.slice(0, 4);
  const otherUnitsSold = sortedItems.slice(4).reduce((sum, item) => sum + item.unitsSold, 0);
  const chartItems = otherUnitsSold
    ? [...topBrands, { brand: 'Others', revenue: 0, unitsSold: otherUnitsSold }]
    : topBrands;

  return chartItems.map((item, index) => ({
    id: item.brand.toLowerCase(),
    label: item.brand,
    share: Math.round((item.unitsSold / totalUnitsSold) * 100),
    color: BRAND_COLORS[index % BRAND_COLORS.length],
  }));
};

export const mapTopProducts = async (
  items: AdminDashboardTopProduct[],
  signal?: AbortSignal
): Promise<IAdminPanelProductItem[]> => {
  const imageResults = await Promise.allSettled(
    items.map((item) =>
      item.previewImage?.url
        ? phonesService.getImageObjectUrl(item.previewImage.url, signal)
        : Promise.resolve(FALLBACK_IMAGE)
    )
  );

  return items.map((item, index) => ({
    id: String(item.phoneId),
    title: formatProductDisplayName(item.brand, item.name),
    sales: `${formatAdminDashboardNumber(item.unitsSold)} sales - $${formatAdminDashboardNumber(
      item.revenue
    )}`,
    trend: formatAdminDashboardTrend(item.growthPercent),
    stock: `${formatAdminDashboardNumber(item.stock)} pcs`,
    statusLabel: ADMIN_PRODUCT_STATUS_LABELS[item.status],
    image: imageResults[index]?.status === 'fulfilled' ? imageResults[index].value : FALLBACK_IMAGE,
  }));
};

export const mapRecentOrders = (items: AdminDashboardRecentOrder[]): IAdminPanelOrderItem[] =>
  items.slice(0, DASHBOARD_SIDE_LIST_LIMIT).map((item) => ({
    id: String(item.id),
    orderNumber: `#ORD-${item.id}`,
    customer: item.customerName || 'Guest',
    email: item.customerEmail,
    age: formatAdminDashboardOrderAge(item.createdAt),
    status: mapApiStatusToFrontendStatus(item.status),
  }));

export const mapLowStock = (items: AdminDashboardLowStockProduct[]): IAdminPanelLowStockItem[] =>
  items.slice(0, DASHBOARD_SIDE_LIST_LIMIT).map((item) => ({
    id: String(item.id),
    title: formatProductDisplayName(item.brand, item.name),
    left: item.stock,
    threshold: 10,
  }));

export const mapSidebarCountersToMenu = (
  counters: ApiAdminSidebarCounters
): IAdminPanelMenuItem[] =>
  ADMIN_PANEL_MENU.map((item) => {
    if (item.id === 'product') return { ...item, badge: counters.productsCount };
    if (item.id === 'orders') return { ...item, badge: counters.ordersCount };
    if (item.id === 'customers') return { ...item, badge: counters.customersCount };
    return item;
  });
