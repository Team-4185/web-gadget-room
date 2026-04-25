import { AdminProductManagementTable } from '@/components';
import type { AdminProductStatus, IAdminPanelManagedProduct } from '@/core/types';

import './AdminProductsTab.css';

interface IProps {
  products: IAdminPanelManagedProduct[];
  availableBrands: string[];
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  isLoading: boolean;
  searchQuery: string;
  selectedBrand: string;
  selectedStatus: AdminProductStatus | '';
  onPreviousPage: () => void;
  onNextPage: () => void;
  onSearchChange: (value: string) => void;
  onBrandChange: (value: string) => void;
  onStatusChange: (value: AdminProductStatus | '') => void;
  onRefreshProducts: () => void;
}

export const AdminProductsTab = ({
  products,
  availableBrands,
  totalProducts,
  currentPage,
  totalPages,
  isFirstPage,
  isLastPage,
  isLoading,
  searchQuery,
  selectedBrand,
  selectedStatus,
  onPreviousPage,
  onNextPage,
  onSearchChange,
  onBrandChange,
  onStatusChange,
  onRefreshProducts,
}: IProps) => {
  return (
    <div className="admin-products-tab" aria-label="Products management">
      <AdminProductManagementTable
        products={products}
        availableBrands={availableBrands}
        totalProducts={totalProducts}
        currentPage={currentPage}
        totalPages={totalPages}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        isLoading={isLoading}
        searchQuery={searchQuery}
        selectedBrand={selectedBrand}
        selectedStatus={selectedStatus}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
        onSearchChange={onSearchChange}
        onBrandChange={onBrandChange}
        onStatusChange={onStatusChange}
        onRefreshProducts={onRefreshProducts}
      />
    </div>
  );
};
