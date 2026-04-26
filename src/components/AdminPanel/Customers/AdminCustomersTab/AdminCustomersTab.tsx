import { AdminCustomerKpiCard, AdminCustomersTable } from '@/components';
import type { IAdminCustomerItem, IAdminCustomerKpiItem } from '@/core/types';

import './AdminCustomersTab.css';

interface IProps {
  customers: IAdminCustomerItem[];
  kpis: IAdminCustomerKpiItem[];
}

export const AdminCustomersTab = ({ customers, kpis }: IProps) => {
  return (
    <div className="admin-customers-tab" aria-label="Customers management">
      <div className="admin-customers-tab__kpis">
        {kpis.map((item) => (
          <AdminCustomerKpiCard key={item.id} item={item} />
        ))}
      </div>

      <AdminCustomersTable customers={customers} />
    </div>
  );
};
