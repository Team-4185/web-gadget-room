import { AdminProductManagementTable } from '@/components';
import type { IAdminPanelManagedProduct } from '@/core/types';

import './AdminProductsTab.css';

interface IProps {
  products: IAdminPanelManagedProduct[];
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  isLoading: boolean;
  searchQuery: string;
  selectedBrand: string;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onSearchChange: (value: string) => void;
  onBrandChange: (value: string) => void;
}

export const AdminProductsTab = ({
  products,
  totalProducts,
  currentPage,
  totalPages,
  isFirstPage,
  isLastPage,
  isLoading,
  searchQuery,
  selectedBrand,
  onPreviousPage,
  onNextPage,
  onSearchChange,
  onBrandChange,
}: IProps) => {
  return (
    <div className="admin-products-tab" aria-label="Products management">
      <AdminProductManagementTable
        products={products}
        totalProducts={totalProducts}
        currentPage={currentPage}
        totalPages={totalPages}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        isLoading={isLoading}
        searchQuery={searchQuery}
        selectedBrand={selectedBrand}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
        onSearchChange={onSearchChange}
        onBrandChange={onBrandChange}
      />
    </div>
  );
};
