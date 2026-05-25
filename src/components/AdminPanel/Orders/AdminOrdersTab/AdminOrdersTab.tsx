import { AdminOrderKpiCard, AdminOrdersTable } from '@/components';
import type { IAdminManagedOrderItem, IAdminOrderKpiItem } from '@/core/types';
import type { AdminOrderFilterId } from '@/core/constants';

import './AdminOrdersTab.css';

interface IProps {
  kpis: IAdminOrderKpiItem[];
  orders: IAdminManagedOrderItem[];
  totalOrders: number;
  currentPage: number;
  totalPages: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  isLoading: boolean;
  activeFilter: AdminOrderFilterId;
  onFilterChange: (filter: AdminOrderFilterId) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export const AdminOrdersTab = ({
  kpis,
  orders,
  totalOrders,
  currentPage,
  totalPages,
  isFirstPage,
  isLastPage,
  isLoading,
  activeFilter,
  onFilterChange,
  onPreviousPage,
  onNextPage,
}: IProps) => {
  return (
    <div className="admin-orders-tab" aria-label="Orders management">
      <div className="admin-orders-tab__kpis">
        {kpis.map((item) => (
          <AdminOrderKpiCard key={item.id} item={item} />
        ))}
      </div>

      <AdminOrdersTable
        orders={orders}
        totalOrders={totalOrders}
        currentPage={currentPage}
        totalPages={totalPages}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        isLoading={isLoading}
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
      />
    </div>
  );
};
