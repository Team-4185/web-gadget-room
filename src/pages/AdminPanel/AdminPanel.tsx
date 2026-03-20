import { NotificationsNoneOutlined, PersonOutlined, AddOutlined } from '@mui/icons-material';
import { Container, Typography } from '@mui/material';

import {
  AdminPanelBrandChart,
  AdminPanelLowStock,
  AdminPanelProductRow,
  AdminPanelRecentOrders,
  AdminPanelSalesChart,
  AdminPanelSidebar,
  AdminPanelStatCard,
} from '@/components';
import { useAdminPanelData } from '@/core/hooks';

import './AdminPanel.css';

export const AdminPanel = () => {
  const { greeting, subtitle, menu, stats, brands, topProducts, recentOrders, lowStock } =
    useAdminPanelData();

  return (
    <section className="admin-panel" aria-label="Admin panel page">
      <Container disableGutters>
        <div className="admin-panel__layout">
          <AdminPanelSidebar menu={menu} activeItem="dashboard" />

          <div className="admin-panel__content">
            <div className="admin-panel__toolbar">
              <NotificationsNoneOutlined sx={{ fontSize: '30px', color: 'var(--blue-violet)' }} />
              <PersonOutlined sx={{ fontSize: '30px', color: 'var(--blue-violet)' }} />
            </div>

            <div className="admin-panel__hero">
              <Typography component="h1" sx={{ fontSize: '24px', fontWeight: 600, lineHeight: 1 }}>
                {greeting}
              </Typography>
              <Typography component="p" sx={{ marginTop: '6px', fontSize: '14px' }}>
                {subtitle}
              </Typography>
            </div>

            <div className="admin-panel__stats" aria-label="Store stats">
              {stats.map((item) => (
                <AdminPanelStatCard key={item.id} item={item} />
              ))}
            </div>

            <div className="admin-panel__charts" aria-label="Analytics">
              <AdminPanelSalesChart />
              <AdminPanelBrandChart brands={brands} />
            </div>

            <div className="admin-panel__bottom-grid">
              <section className="admin-panel__products" aria-label="Top selling products">
                <div className="admin-panel__products-header">
                  <Typography component="h2" sx={{ fontSize: '20px', fontWeight: 600, lineHeight: 1 }}>
                    Top Selling Products
                  </Typography>
                  <button type="button" className="admin-panel__add-product">
                    <AddOutlined sx={{ fontSize: '20px' }} />
                    Add Product
                  </button>
                </div>

                <div className="admin-panel__products-list">
                  {topProducts.map((item) => (
                    <AdminPanelProductRow key={item.id} item={item} />
                  ))}
                </div>
              </section>

              <div className="admin-panel__side-cards">
                <AdminPanelRecentOrders orders={recentOrders} />
                <AdminPanelLowStock items={lowStock} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
