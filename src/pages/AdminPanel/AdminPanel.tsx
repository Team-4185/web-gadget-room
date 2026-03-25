import { useState } from 'react';
import { Container, Typography } from '@mui/material';

import {
  AdminCustomersTab,
  AdminDashboardTab,
  AdminOrdersTab,
  AdminPanelSidebar,
  AdminProductsTab,
} from '@/components';
import {
  useAdminCustomersData,
  useAdminOrdersData,
  useAdminPanelData,
  useAdminProductManagementData,
} from '@/core/hooks';
import type { AdminPanelTab } from '@/core/types';

import './AdminPanel.css';

export const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<AdminPanelTab>('dashboard');

  const { greeting, subtitle, menu, stats, brands, topProducts, recentOrders, lowStock } =
    useAdminPanelData();
  const { products, totalProducts } = useAdminProductManagementData();
  const { kpis: ordersKpis, orders, totalOrders } = useAdminOrdersData();
  const { kpis: customersKpis, customers, totalCustomers } = useAdminCustomersData();

  const isDashboardTab = activeTab === 'dashboard';
  const isProductTab = activeTab === 'product';
  const isOrdersTab = activeTab === 'orders';
  const isCustomersTab = activeTab === 'customers';

  return (
    <section className="admin-panel" aria-label="Admin panel page">
      <Container disableGutters>
        <div className="admin-panel__layout">
          <AdminPanelSidebar menu={menu} activeItem={activeTab} onTabChange={setActiveTab} />

          <div className="admin-panel__content">
            <div className="admin-panel__hero">
              <Typography variant="h4" component="h1" sx={{ fontWeight: 600, lineHeight: 1 }}>
                {greeting}
              </Typography>
              <Typography variant="body2" component="p" sx={{ marginTop: '6px' }}>
                {subtitle}
              </Typography>
            </div>

            {isDashboardTab && (
              <AdminDashboardTab
                stats={stats}
                brands={brands}
                topProducts={topProducts}
                recentOrders={recentOrders}
                lowStock={lowStock}
              />
            )}
            {isProductTab && <AdminProductsTab products={products} totalProducts={totalProducts} />}
            {isOrdersTab && (
              <AdminOrdersTab kpis={ordersKpis} orders={orders} totalOrders={totalOrders} />
            )}
            {isCustomersTab && (
              <AdminCustomersTab
                kpis={customersKpis}
                customers={customers}
                totalCustomers={totalCustomers}
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
