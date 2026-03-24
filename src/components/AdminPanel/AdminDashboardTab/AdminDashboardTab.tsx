import { AddOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';

import {
  AdminPanelBrandChart,
  AdminPanelLowStock,
  AdminPanelProductRow,
  AdminPanelRecentOrders,
  AdminPanelSalesChart,
  AdminPanelStatCard,
} from '@/components';
import type {
  IAdminPanelBrandItem,
  IAdminPanelLowStockItem,
  IAdminPanelOrderItem,
  IAdminPanelProductItem,
  IAdminPanelStatItem,
} from '@/core/types';

import './AdminDashboardTab.css';

interface IProps {
  brands: IAdminPanelBrandItem[];
  lowStock: IAdminPanelLowStockItem[];
  recentOrders: IAdminPanelOrderItem[];
  stats: IAdminPanelStatItem[];
  topProducts: IAdminPanelProductItem[];
}

export const AdminDashboardTab = ({
  brands,
  lowStock,
  recentOrders,
  stats,
  topProducts,
}: IProps) => {
  return (
    <>
      <div className="admin-dashboard-tab__stats" aria-label="Store stats">
        {stats.map((item) => (
          <AdminPanelStatCard key={item.id} item={item} />
        ))}
      </div>

      <div className="admin-dashboard-tab__charts" aria-label="Analytics">
        <AdminPanelSalesChart />
        <AdminPanelBrandChart brands={brands} />
      </div>

      <div className="admin-dashboard-tab__bottom-grid">
        <section className="admin-dashboard-tab__products" aria-label="Top selling products">
          <div className="admin-dashboard-tab__products-header">
            <Typography component="h2" sx={{ fontSize: '20px', fontWeight: 600, lineHeight: 1 }}>
              Top Selling Products
            </Typography>
            <button type="button" className="admin-dashboard-tab__add-product">
              <AddOutlined sx={{ fontSize: '20px' }} />
              Add Product
            </button>
          </div>

          <div className="admin-dashboard-tab__products-list">
            {topProducts.map((item) => (
              <AdminPanelProductRow key={item.id} item={item} />
            ))}
          </div>
        </section>

        <div className="admin-dashboard-tab__side-cards">
          <AdminPanelRecentOrders orders={recentOrders} />
          <AdminPanelLowStock items={lowStock} />
        </div>
      </div>
    </>
  );
};
