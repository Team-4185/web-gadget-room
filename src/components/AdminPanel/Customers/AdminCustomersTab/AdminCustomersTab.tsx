import { AdminCustomerKpiCard, AdminCustomersTable } from '@/components';
import type { IAdminCustomerItem, IAdminCustomerKpiItem } from '@/core/types';

import './AdminCustomersTab.css';

interface IProps {
  customers: IAdminCustomerItem[];
  kpis: IAdminCustomerKpiItem[];
  searchQuery: string;
  currentPage: number;
  totalCustomers: number;
  totalPages: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  isLoadingCustomers?: boolean;
  onSearchChange: (value: string) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export const AdminCustomersTab = ({
  customers,
  kpis,
  searchQuery,
  currentPage,
  totalCustomers,
  totalPages,
  isFirstPage,
  isLastPage,
  isLoadingCustomers = false,
  onSearchChange,
  onPreviousPage,
  onNextPage,
}: IProps) => {
  return (
    <div className="admin-customers-tab" aria-label="Customers management">
      <div className="admin-customers-tab__kpis">
        {kpis.map((item) => (
          <AdminCustomerKpiCard key={item.id} item={item} />
        ))}
      </div>

      <AdminCustomersTable
        customers={customers}
        searchQuery={searchQuery}
        currentPage={currentPage}
        totalCustomers={totalCustomers}
        totalPages={totalPages}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        isLoading={isLoadingCustomers}
        onSearchChange={onSearchChange}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
      />
    </div>
  );
};
