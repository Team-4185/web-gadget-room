import { NotificationsNoneOutlined, PersonOutlined } from '@mui/icons-material';
import { Container, Typography } from '@mui/material';

import { AdminCustomerKpiCard, AdminCustomersTable, AdminPanelSidebar } from '@/components';
import { useAdminCustomersData } from '@/core/hooks';

import './AdminCustomers.css';

export const AdminCustomers = () => {
  const { greeting, subtitle, menu, kpis, customers, totalCustomers } = useAdminCustomersData();

  return (
    <section className="admin-customers" aria-label="Admin customers page">
      <Container disableGutters>
        <div className="admin-customers__layout">
          <AdminPanelSidebar menu={menu} activeItem="customers" />

          <div className="admin-customers__content">
            <div className="admin-customers__toolbar">
              <NotificationsNoneOutlined sx={{ fontSize: '30px', color: 'var(--blue-violet)' }} />
              <PersonOutlined sx={{ fontSize: '30px', color: 'var(--blue-violet)' }} />
            </div>

            <div className="admin-customers__hero">
              <Typography component="h1" sx={{ fontSize: '36px', fontWeight: 600, lineHeight: 1 }}>
                {greeting}
              </Typography>
              <Typography component="p" sx={{ marginTop: '6px', fontSize: '14px' }}>
                {subtitle}
              </Typography>
            </div>

            <div className="admin-customers__kpis">
              {kpis.map((item) => (
                <AdminCustomerKpiCard key={item.id} item={item} />
              ))}
            </div>

            <AdminCustomersTable customers={customers} totalCustomers={totalCustomers} />
          </div>
        </div>
      </Container>
    </section>
  );
};
