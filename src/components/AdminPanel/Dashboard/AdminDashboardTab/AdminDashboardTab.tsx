// import { Typography } from '@mui/material';

// import { Plus } from '@/assets';
import {
  // AdminPanelBrandChart,
  // AdminPanelLowStock,
  // AdminPanelProductRow,
  // AdminPanelRecentOrders,
  // AdminPanelSalesChart,
  // AdminPanelStatCard,
  // Button,
} from '@/components';
import type {
  AdminPanelTab,
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
  onTabChange?: (tab: AdminPanelTab) => void;
  recentOrders: IAdminPanelOrderItem[];
  stats: IAdminPanelStatItem[];
  topProducts: IAdminPanelProductItem[];
}

export const AdminDashboardTab = (
  {
    // brands,
    // lowStock,
    // onTabChange,
    // recentOrders,
    // stats,
    // topProducts,
  }: IProps
) => {
  return (
    <>
      {/* <div className="admin-dashboard-tab__stats" aria-label="Store stats">
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
            <Button
              maxWidth="141px"
              height="36px"
              border="none"
              borderRadius="12px"
              sx={{ fontSize: '15px', fontWeight: 500 }}
            >
              <div className="admin-dashboard-tab__add-product-icon" aria-hidden="true">
                <Plus color="currentColor" />
                Add Product
              </div>
            </Button>
          </div>

          <div className="admin-dashboard-tab__products-list">
            {topProducts.map((item) => (
              <AdminPanelProductRow key={item.id} item={item} />
            ))}
          </div>
        </section>

        <div className="admin-dashboard-tab__side-cards">
          <AdminPanelRecentOrders orders={recentOrders} onTabChange={onTabChange} />
          <AdminPanelLowStock items={lowStock} />
        </div>
      </div> */}
    </>
  );
};
