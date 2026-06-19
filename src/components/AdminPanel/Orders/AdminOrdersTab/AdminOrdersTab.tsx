import { AdminOrderKpiCard, AdminOrdersTable } from '@/components';
import type {
  AdminOrderAction,
  IAdminManagedOrderItem,
  IAdminOrderDetails,
  IAdminOrderKpiItem,
} from '@/core/types';
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
  selectedOrderDetails: IAdminOrderDetails | null;
  isOrderDetailsLoading: boolean;
  isOrderActionLoading: boolean;
  activeFilter: AdminOrderFilterId;
  onFilterChange: (filter: AdminOrderFilterId) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onViewOrder: (orderId: string) => void;
  onCloseOrderDetails: () => void;
  onApplyOrderAction: (orderId: string, action: AdminOrderAction) => void;
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
  selectedOrderDetails,
  isOrderDetailsLoading,
  isOrderActionLoading,
  activeFilter,
  onFilterChange,
  onPreviousPage,
  onNextPage,
  onViewOrder,
  onCloseOrderDetails,
  onApplyOrderAction,
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
        selectedOrderDetails={selectedOrderDetails}
        isOrderDetailsLoading={isOrderDetailsLoading}
        isOrderActionLoading={isOrderActionLoading}
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
        onViewOrder={onViewOrder}
        onCloseOrderDetails={onCloseOrderDetails}
        onApplyOrderAction={onApplyOrderAction}
      />
    </div>
  );
};
