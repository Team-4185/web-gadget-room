import { AdminOrderKpiCard, AdminOrdersTable } from '@/components';
import type { IAdminManagedOrderItem, IAdminOrderKpiItem } from '@/core/types';

import './AdminOrdersTab.css';

interface IProps {
  kpis: IAdminOrderKpiItem[];
  orders: IAdminManagedOrderItem[];
  totalOrders: number;
}

export const AdminOrdersTab = ({ kpis, orders, totalOrders }: IProps) => {
  return (
    <div className="admin-orders-tab" aria-label="Orders management">
      <div className="admin-orders-tab__kpis">
        {kpis.map((item) => (
          <AdminOrderKpiCard key={item.id} item={item} />
        ))}
      </div>

      <AdminOrdersTable orders={orders} totalOrders={totalOrders} />
    </div>
  );
};
