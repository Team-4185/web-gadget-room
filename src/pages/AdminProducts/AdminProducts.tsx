import { NotificationsNoneOutlined, PersonOutlined } from '@mui/icons-material';
import { Container, Typography } from '@mui/material';

import { AdminPanelSidebar, AdminProductManagementTable } from '@/components';
import { useAdminProductManagementData } from '@/core/hooks';

import './AdminProducts.css';

export const AdminProducts = () => {
  const { greeting, subtitle, menu, products, totalProducts } = useAdminProductManagementData();

  return (
    <section className="admin-products" aria-label="Admin products page">
      <Container disableGutters>
        <div className="admin-products__layout">
          <AdminPanelSidebar menu={menu} activeItem="product" />

          <div className="admin-products__content">
            <div className="admin-products__toolbar">
              <NotificationsNoneOutlined sx={{ fontSize: '30px', color: 'var(--blue-violet)' }} />
              <PersonOutlined sx={{ fontSize: '30px', color: 'var(--blue-violet)' }} />
            </div>

            <div className="admin-products__hero">
              <Typography component="h1" sx={{ fontSize: '36px', fontWeight: 600, lineHeight: 1 }}>
                {greeting}
              </Typography>
              <Typography component="p" sx={{ marginTop: '6px', fontSize: '14px' }}>
                {subtitle}
              </Typography>
            </div>

            <AdminProductManagementTable products={products} totalProducts={totalProducts} />
          </div>
        </div>
      </Container>
    </section>
  );
};
