import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import {
  ADMIN_PANEL_BRANDS,
  ADMIN_PANEL_LOW_STOCK,
  ADMIN_PANEL_MENU,
  ADMIN_PANEL_PRODUCTS,
  ADMIN_PANEL_RECENT_ORDERS,
  ADMIN_PANEL_STATS,
} from '@/core/constants';
import { Customers, Dollar, Order, Product } from '@/assets';
import {
  adminProductsService,
  adminDashboardService,
  type AdminDashboardBrandSale,
  type AdminDashboardLowStockProduct,
  type AdminDashboardRecentOrder,
  type AdminDashboardSummary,
  type AdminDashboardTopProduct,
} from '@/core/services';
import { useAppSelector } from '@/core/store';
import type {
  AdminOrderStatus,
  IAdminPanelBrandItem,
  IAdminPanelLowStockItem,
  IAdminPanelOrderItem,
  IAdminPanelProductItem,
  IAdminPanelStatItem,
} from '@/core/types';
import { FALLBACK_IMAGE } from '@/core/constants';

const BRAND_COLORS = ['#4285f4', '#8a3ffc', '#d930b9', '#eaa60f', '#5f6b83'];
const DASHBOARD_SIDE_LIST_LIMIT = 3;

const formatCurrency = (value: number) =>
  `$ ${value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

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
    trend: '+18.2%',
    isPositive: true,
    icon: Dollar,
  },
  {
    id: 'orders',
    title: 'Total orders',
    value: String(summary.totalOrders),
    subtitle: '124 in processing',
    trend: '+12.5%',
    isPositive: true,
    icon: Order,
  },
  {
    id: 'stock',
    title: 'Items in stock',
    value: String(summary.lowStockProducts),
    subtitle: '12 running low',
    trend: '-3.1%',
    isPositive: false,
    icon: Product,
  },
  {
    id: 'clients',
    title: 'New clients',
    value: String(summary.totalCustomers),
    subtitle: 'This month',
    trend: '+24.8%',
    isPositive: true,
    icon: Customers,
  },
];

const mapBrandSales = (items: AdminDashboardBrandSale[]): IAdminPanelBrandItem[] => {
  const totalRevenue = items.reduce((sum, item) => sum + item.revenue, 0);

  if (!totalRevenue) return ADMIN_PANEL_BRANDS;

  return items.map((item, index) => ({
    id: item.brand.toLowerCase(),
    label: item.brand,
    share: Math.round((item.revenue / totalRevenue) * 100),
    color: BRAND_COLORS[index % BRAND_COLORS.length],
  }));
};

const mapTopProducts = async (
  items: AdminDashboardTopProduct[],
  signal: AbortSignal
): Promise<IAdminPanelProductItem[]> => {
  const productDetails = await Promise.allSettled(
    items.map((item) => adminProductsService.getById(item.phoneId, signal))
  );

  return items.map((item, index) => {
    const product = productDetails[index];
    const fallbackProduct = ADMIN_PANEL_PRODUCTS[index];
    const stock =
      product?.status === 'fulfilled' && typeof product.value.stock === 'number'
        ? `${product.value.stock} pcs`
        : (fallbackProduct?.stock ?? '');

    return {
      id: String(item.phoneId),
      title: item.name,
      sales: `${item.unitsSold} sales - USD ${item.revenue.toLocaleString('en-US')}`,
      trend: item.sku,
      stock,
      image: FALLBACK_IMAGE,
    };
  });
};

const mapRecentOrders = (items: AdminDashboardRecentOrder[]): IAdminPanelOrderItem[] =>
  items.slice(0, DASHBOARD_SIDE_LIST_LIMIT).map((item) => ({
    id: String(item.id),
    orderNumber: `#ORD-${item.id}`,
    customer: item.customerEmail,
    product: `${formatCurrency(item.total)} - ${item.paymentStatus}`,
    age: formatOrderAge(item.createdAt),
    status: mapApiStatusToFrontendStatus(item.status),
  }));

const mapLowStock = (items: AdminDashboardLowStockProduct[]): IAdminPanelLowStockItem[] =>
  items.slice(0, DASHBOARD_SIDE_LIST_LIMIT).map((item) => ({
    id: String(item.id),
    title: `${item.name} (${item.sku})`,
    left: item.stock,
    threshold: 5,
  }));

export const useAdminPanelData = () => {
  const email = useAppSelector((state) => state.auth.email);
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
      const [summary, brandSales, topSellingProducts, latestOrders, stockAlerts] =
        await Promise.allSettled([
          adminDashboardService.getSummary(controller.signal),
          adminDashboardService.getSalesByBrand(controller.signal),
          adminDashboardService.getTopSellingProducts(controller.signal),
          adminDashboardService.getRecentOrders(controller.signal),
          adminDashboardService.getLowStockAlerts(controller.signal),
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
      menu: ADMIN_PANEL_MENU,
      stats,
      brands,
      topProducts,
      recentOrders,
      lowStock,
    };
  }, [brands, email, lowStock, recentOrders, stats, topProducts]);
};
