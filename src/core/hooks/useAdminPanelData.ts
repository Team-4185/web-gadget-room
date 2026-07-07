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
import { adminDashboardService, adminNavigationService } from '@/core/services';
import type {
  IAdminPanelBrandItem,
  IAdminPanelLowStockItem,
  IAdminPanelMenuItem,
  IAdminPanelOrderItem,
  IAdminPanelProductItem,
  IAdminPanelStatItem,
} from '@/core/types';
import {
  DASHBOARD_SIDE_LIST_LIMIT,
  getEmptyStats,
  isDemoFallbackEnabled,
  mapBrandSales,
  mapLowStock,
  mapRecentOrders,
  mapSidebarCountersToMenu,
  mapSummaryToStats,
  mapTopProducts,
} from '@/core/utils';

export const useAdminPanelData = () => {
  const demoFallbackEnabled = isDemoFallbackEnabled();
  const [menu, setMenu] = useState<IAdminPanelMenuItem[]>(ADMIN_PANEL_MENU);
  const [stats, setStats] = useState<IAdminPanelStatItem[]>(
    demoFallbackEnabled ? ADMIN_PANEL_STATS : getEmptyStats
  );
  const [brands, setBrands] = useState<IAdminPanelBrandItem[]>(
    demoFallbackEnabled ? ADMIN_PANEL_BRANDS : []
  );
  const [topProducts, setTopProducts] = useState<IAdminPanelProductItem[]>(
    demoFallbackEnabled ? ADMIN_PANEL_PRODUCTS : []
  );
  const [recentOrders, setRecentOrders] = useState<IAdminPanelOrderItem[]>(
    demoFallbackEnabled ? ADMIN_PANEL_RECENT_ORDERS.slice(0, DASHBOARD_SIDE_LIST_LIMIT) : []
  );
  const [lowStock, setLowStock] = useState<IAdminPanelLowStockItem[]>(
    demoFallbackEnabled ? ADMIN_PANEL_LOW_STOCK.slice(0, DASHBOARD_SIDE_LIST_LIMIT) : []
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
        setBrands(mapBrandSales(brandSales.value, demoFallbackEnabled));
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
  }, [demoFallbackEnabled]);

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
  }, [brands, lowStock, menu, recentOrders, stats, topProducts]);
};
