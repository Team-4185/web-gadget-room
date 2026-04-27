import { useMemo, type FC } from 'react';
import { Typography } from '@mui/material';

import type { AdminProductStatus, IAdminPanelManagedProduct } from '@/core/types';
import {
  ADMIN_PRODUCT_FIELD_TOOLTIPS,
  ADMIN_PRODUCT_STATUS_OPTIONS,
} from '@/core/constants';
import { buildAdminProductBrandOptions } from '@/core/utils';
import { useAdminProductModal } from '@/core/hooks';
import { AdminPagination, Button, ConfirmationModal, Search, Select } from '@/components';
import { Plus } from '@/assets';
import { AdminProductModal } from '../AdminProductModal';
import { AdminProductTableRow } from '../AdminProductTableRow';

import './AdminProductManagementTable.css';

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

export const AdminProductManagementTable: FC<IProps> = ({
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
}) => {
  const productModal = useAdminProductModal({ onRefreshProducts });

  const brandOptions = useMemo(
    () => buildAdminProductBrandOptions(availableBrands),
    [availableBrands]
  );

  return (
    <section className="admin-product-management" aria-label="Product management">
      <div className="admin-product-management__header">
        <div>
          <Typography component="h2" sx={{ fontSize: '24px', fontWeight: 600, lineHeight: 1 }}>
            Product Management
          </Typography>
          <Typography variant="body2" component="p" sx={{ marginTop: '6px' }}>
            All products in your store
          </Typography>
        </div>

        <Button
          maxWidth="141px"
          height="36px"
          border="none"
          borderRadius="12px"
          sx={{ fontSize: '15px', fontWeight: 500 }}
          onClick={productModal.openAddModal}
        >
          <div className="admin-product-management__add-product-icon" aria-hidden="true">
            <Plus color="currentColor" />
            Add Product
          </div>
        </Button>
      </div>

      <div className="admin-product-management__filters">
        <Search
          className="admin-product-management__search"
          ariaLabel="Search products"
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search Products"
        />

        <Select
          data={brandOptions}
          styleVariant="subtleBorder"
          maxWidth="100%"
          height="40px"
          color="var(--black)"
          fontSize="16px"
          selectPadding="12px"
          value={selectedBrand}
          onChange={onBrandChange}
          placeholder="All brands"
        />

        <Select
          data={ADMIN_PRODUCT_STATUS_OPTIONS}
          styleVariant="subtleBorder"
          maxWidth="100%"
          height="40px"
          color="var(--black)"
          fontSize="16px"
          selectPadding="12px"
          value={selectedStatus}
          onChange={(value) => onStatusChange(value as AdminProductStatus | '')}
          placeholder="All statuses"
        />
      </div>

      <div className="admin-product-management__table-wrap">
        <table className="admin-product-management__table">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <AdminProductTableRow
                key={product.id}
                product={product}
                onEdit={(selectedProduct) => void productModal.openEditModal(selectedProduct)}
                onDelete={productModal.openDeleteConfirmation}
              />
            ))}
          </tbody>
        </table>
      </div>

      <AdminPagination
        totalItems={totalProducts}
        itemLabel="products"
        currentPage={currentPage}
        totalPages={totalPages}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        isLoading={isLoading}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
      />

      <AdminProductModal
        isOpen={productModal.isProductModalOpen}
        title={productModal.isEditingProduct ? 'Edit product' : 'Add a new product'}
        submitLabel={productModal.isEditingProduct ? 'Save edit' : 'Save'}
        values={productModal.draftProduct}
        imageName={productModal.imageName}
        uploadLabel={productModal.isEditingProduct ? 'Edit an image' : 'Upload an image'}
        editDescriptionLabel={productModal.isEditingProduct ? 'Edit description' : 'Description'}
        images={productModal.isEditingProduct ? productModal.productImages : undefined}
        fieldErrors={productModal.fieldErrors}
        fieldTooltips={ADMIN_PRODUCT_FIELD_TOOLTIPS}
        onClose={productModal.closeProductModal}
        onSave={() => void productModal.saveProductModal()}
        onValueChange={productModal.handleDraftChange}
        onImageChange={productModal.handleImageChange}
        onImageDelete={(imageId) => void productModal.deleteProductImage(imageId)}
      />

      <ConfirmationModal
        isOpen={Boolean(productModal.productToDelete)}
        title="Delete a product"
        description={
          <p>
            Are you sure you want to erase <strong>{productModal.productToDelete?.title}</strong>?
            This action cannot be undone.
          </p>
        }
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        isLoading={productModal.isDeleting}
        onCancel={productModal.closeDeleteConfirmation}
        onConfirm={() => void productModal.deleteProduct()}
      />
    </section>
  );
};
