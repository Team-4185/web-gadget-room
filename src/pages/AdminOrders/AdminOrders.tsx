import { NotificationsNoneOutlined, PersonOutlined } from '@mui/icons-material';
import { Container, Typography } from '@mui/material';

import { AdminOrderKpiCard, AdminOrdersTable, AdminPanelSidebar } from '@/components';
import { useAdminOrdersData } from '@/core/hooks';

import './AdminOrders.css';

export const AdminOrders = () => {
  const { greeting, subtitle, menu, kpis, orders, totalOrders } = useAdminOrdersData();

  return (
    <section className="admin-orders" aria-label="Admin orders page">
      <Container disableGutters>
        <div className="admin-orders__layout">
          <AdminPanelSidebar menu={menu} activeItem="orders" />

          <div className="admin-orders__content">
            <div className="admin-orders__toolbar">
              <NotificationsNoneOutlined sx={{ fontSize: '30px', color: 'var(--blue-violet)' }} />
              <PersonOutlined sx={{ fontSize: '30px', color: 'var(--blue-violet)' }} />
            </div>

            <div className="admin-orders__hero">
              <Typography component="h1" sx={{ fontSize: '36px', fontWeight: 600, lineHeight: 1 }}>
                {greeting}
              </Typography>
              <Typography component="p" sx={{ marginTop: '6px', fontSize: '14px' }}>
                {subtitle}
              </Typography>
            </div>

            <div className="admin-orders__kpis">
              {kpis.map((item) => (
                <AdminOrderKpiCard key={item.id} item={item} />
              ))}
            </div>

            <AdminOrdersTable orders={orders} totalOrders={totalOrders} />
          </div>
        </div>
      </Container>
    </section>
  );
};
