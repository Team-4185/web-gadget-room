import { AdminProductManagementTable } from '@/components';
import type { IAdminPanelManagedProduct } from '@/core/types';

import './AdminProductsTab.css';

interface IProps {
  products: IAdminPanelManagedProduct[];
  totalProducts: number;
}

export const AdminProductsTab = ({ products, totalProducts }: IProps) => {
  return (
    <div className="admin-products-tab" aria-label="Products management">
      <AdminProductManagementTable products={products} totalProducts={totalProducts} />
    </div>
  );
};
