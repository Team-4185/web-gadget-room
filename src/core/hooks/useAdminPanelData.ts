import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import {
  ADMIN_PANEL_BRANDS,
  ADMIN_PANEL_LOW_STOCK,
  ADMIN_PANEL_MENU,
  ADMIN_PANEL_PRODUCTS,
  ADMIN_PANEL_RECENT_ORDERS,
  ADMIN_PANEL_STATS,
  ADMIN_PRODUCT_STATUS_LABELS,
} from '@/core/constants';
import { Customers, Dollar, Order, Product } from '@/assets';
import {
  adminDashboardService,
  adminNavigationService,
  phonesService,
  type AdminDashboardBrandSale,
  type AdminDashboardLowStockProduct,
  type AdminDashboardRecentOrder,
  type AdminDashboardSummary,
  type AdminDashboardTopProduct,
} from '@/core/services';
import { useAppSelector } from '@/core/store';
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
import { FALLBACK_IMAGE } from '@/core/constants';
import { formatProductDisplayName } from '@/core/utils';

const BRAND_COLORS = [
  'var(--chart-brand-apple)',
  'var(--chart-brand-samsung)',
  'var(--chart-brand-xiaomi)',
  'var(--chart-brand-google)',
  'var(--chart-brand-other)',
];
const DASHBOARD_SIDE_LIST_LIMIT = 3;

const formatCurrency = (value: number) =>
  `$ ${value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatNumber = (value: number) => value.toLocaleString('en-US');

const formatTrend = (value: number | null) => {
  if (value === null) return '0%';

  const prefix = value > 0 ? '+' : '';
  return `${prefix}${value}%`;
};

const isPositiveTrend = (value: number | null) => value === null || value >= 0;

const mapApiStatusToFrontendStatus = (status: string): AdminOrderStatus => {
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

const formatOrderAge = (createdAt: string) => {
  const createdTime = new Date(createdAt).getTime();

  if (Number.isNaN(createdTime)) return '';

  const minutes = Math.max(0, Math.floor((Date.now() - createdTime) / 60000));
  if (minutes < 1) return 'now';
  if (minutes < 60) return `${minutes} min`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} h`;

  return `${Math.floor(hours / 24)} d`;
};

const mapSummaryToStats = (summary: AdminDashboardSummary): IAdminPanelStatItem[] => [
  {
    id: 'revenue',
    title: 'Total revenue',
    value: formatCurrency(summary.totalRevenue),
    subtitle: 'Over the last 30 days',
    trend: formatTrend(summary.totalRevenueChangePercent),
    isPositive: isPositiveTrend(summary.totalRevenueChangePercent),
    icon: Dollar,
  },
  {
    id: 'orders',
    title: 'Total orders',
    value: formatNumber(summary.totalOrders),
    subtitle: `${formatNumber(summary.processingOrders)} in processing`,
    trend: formatTrend(summary.totalOrdersChangePercent),
    isPositive: isPositiveTrend(summary.totalOrdersChangePercent),
    icon: Order,
  },
  {
    id: 'stock',
    title: 'Items in stock',
    value: formatNumber(summary.itemsInStock),
    subtitle: `${formatNumber(summary.lowStockProducts)} running low`,
    trend: formatTrend(summary.itemsInStockChangePercent),
    isPositive: isPositiveTrend(summary.itemsInStockChangePercent),
    icon: Product,
  },
  {
    id: 'clients',
    title: 'New clients',
    value: formatNumber(summary.newClients),
    subtitle: 'This month',
    trend: formatTrend(summary.newClientsChangePercent),
    isPositive: isPositiveTrend(summary.newClientsChangePercent),
    icon: Customers,
  },
];

const mapBrandSales = (items: AdminDashboardBrandSale[]): IAdminPanelBrandItem[] => {
  const totalUnitsSold = items.reduce((sum, item) => sum + item.unitsSold, 0);

  if (!totalUnitsSold) return ADMIN_PANEL_BRANDS;

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

const mapTopProducts = async (
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
    sales: `${formatNumber(item.unitsSold)} sales - $${formatNumber(item.revenue)}`,
    trend: formatTrend(item.growthPercent),
    stock: `${formatNumber(item.stock)} pcs`,
    statusLabel: ADMIN_PRODUCT_STATUS_LABELS[item.status],
    image: imageResults[index]?.status === 'fulfilled' ? imageResults[index].value : FALLBACK_IMAGE,
  }));
};

const mapRecentOrders = (items: AdminDashboardRecentOrder[]): IAdminPanelOrderItem[] =>
  items.slice(0, DASHBOARD_SIDE_LIST_LIMIT).map((item) => ({
    id: String(item.id),
    orderNumber: `#ORD-${item.id}`,
    customer: item.customerName || 'Guest',
    email: item.customerEmail,
    age: formatOrderAge(item.createdAt),
    status: mapApiStatusToFrontendStatus(item.status),
  }));

const mapLowStock = (items: AdminDashboardLowStockProduct[]): IAdminPanelLowStockItem[] =>
  items.slice(0, DASHBOARD_SIDE_LIST_LIMIT).map((item) => ({
    id: String(item.id),
    title: formatProductDisplayName(item.brand, item.name),
    left: item.stock,
    threshold: 10,
  }));

const mapSidebarCountersToMenu = (counters: ApiAdminSidebarCounters): IAdminPanelMenuItem[] =>
  ADMIN_PANEL_MENU.map((item) => {
    if (item.id === 'product') return { ...item, badge: counters.productsCount };
    if (item.id === 'orders') return { ...item, badge: counters.ordersCount };
    if (item.id === 'customers') return { ...item, badge: counters.customersCount };
    return item;
  });

export const useAdminPanelData = () => {
  const email = useAppSelector((state) => state.auth.email);
  const [menu, setMenu] = useState<IAdminPanelMenuItem[]>(ADMIN_PANEL_MENU);
  const [stats, setStats] = useState<IAdminPanelStatItem[]>(ADMIN_PANEL_STATS);
  const [brands, setBrands] = useState<IAdminPanelBrandItem[]>(ADMIN_PANEL_BRANDS);
  const [topProducts, setTopProducts] = useState<IAdminPanelProductItem[]>(ADMIN_PANEL_PRODUCTS);
  const [recentOrders, setRecentOrders] = useState<IAdminPanelOrderItem[]>(
    ADMIN_PANEL_RECENT_ORDERS.slice(0, DASHBOARD_SIDE_LIST_LIMIT)
  );
  const [lowStock, setLowStock] = useState<IAdminPanelLowStockItem[]>(
    ADMIN_PANEL_LOW_STOCK.slice(0, DASHBOARD_SIDE_LIST_LIMIT)
  );

  useEffect(() => {
    const controller = new AbortController();

    const loadDashboard = async () => {
      const [summary, brandSales, topSellingProducts, latestOrders, stockAlerts, sidebarCounters] =
        await Promise.allSettled([
          adminDashboardService.getSummary(controller.signal),
          adminDashboardService.getSalesByBrand(controller.signal),
          adminDashboardService.getTopSellingProducts(controller.signal),
          adminDashboardService.getRecentOrders(controller.signal),
          adminDashboardService.getLowStockAlerts(controller.signal),
          adminNavigationService.getSidebarCounters(controller.signal),
        ]);

      if (controller.signal.aborted) return;

      if (summary.status === 'fulfilled') {
        setStats(mapSummaryToStats(summary.value));
      }

      if (brandSales.status === 'fulfilled') {
        setBrands(mapBrandSales(brandSales.value));
      }

      if (topSellingProducts.status === 'fulfilled') {
        setTopProducts(await mapTopProducts(topSellingProducts.value, controller.signal));
      }

      if (latestOrders.status === 'fulfilled') {
        setRecentOrders(mapRecentOrders(latestOrders.value));
      }

      if (stockAlerts.status === 'fulfilled') {
        setLowStock(mapLowStock(stockAlerts.value));
      }

      if (sidebarCounters.status === 'fulfilled') {
        setMenu(mapSidebarCountersToMenu(sidebarCounters.value));
      }
    };

    loadDashboard().catch((error) => {
      if (axios.isAxiosError(error) && error.code === 'ERR_CANCELED') return;
    });

    return () => controller.abort();
  }, []);

  return useMemo(() => {
    return {
      greeting: `Welcome, Team!`,
      subtitle: "Here's what's happening in your store today",
      menu,
      stats,
      brands,
      topProducts,
      recentOrders,
      lowStock,
    };
  }, [brands, email, lowStock, menu, recentOrders, stats, topProducts]);
};
