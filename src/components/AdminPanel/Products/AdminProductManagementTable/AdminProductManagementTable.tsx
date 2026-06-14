import { useMemo, type FC } from 'react';
import { Typography } from '@mui/material';

import type { AdminProductStatus, IAdminPanelManagedProduct } from '@/core/types';
import { ADMIN_PRODUCT_FIELD_TOOLTIPS, ADMIN_PRODUCT_STATUS_OPTIONS } from '@/core/constants';
import { buildAdminProductBrandOptions } from '@/core/utils';
import { useAdminProductModal, useAdminProductOverviewModal } from '@/core/hooks';
import { AdminPagination, Button, ConfirmationModal, Search, Select } from '@/components';
import { Plus } from '@/assets';
import { AdminProductModal } from '../AdminProductModal';
import { AdminProductOverviewModal } from '../AdminProductOverviewModal';
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
  const overviewModal = useAdminProductOverviewModal();

  const brandOptions = useMemo(
    () => buildAdminProductBrandOptions(availableBrands),
    [availableBrands]
  );

  return (
    <section className="admin-product-management" aria-label="Product management">
      <div className="admin-product-management__header">
        <div>
          <Typography component="h2" fontSize="24px" fontWeight={600} lineHeight={1.1}>
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
                onView={(selectedProduct) => void overviewModal.openOverviewModal(selectedProduct)}
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
        activeTab={productModal.activeTab}
        imageName={productModal.imageName}
        uploadLabel={productModal.isEditingProduct ? 'Edit an image' : 'Upload an image'}
        editDescriptionLabel={productModal.isEditingProduct ? 'Edit description' : 'Description'}
        images={productModal.isEditingProduct ? productModal.productImages : undefined}
        fieldErrors={productModal.fieldErrors}
        variantErrors={productModal.variantErrors}
        fieldTooltips={ADMIN_PRODUCT_FIELD_TOOLTIPS}
        onClose={productModal.closeProductModal}
        onSave={() => void productModal.saveProductModal()}
        onTabChange={productModal.setActiveTab}
        onValueChange={productModal.handleDraftChange}
        onVariantChange={productModal.handleVariantChange}
        onAddVariant={productModal.addVariant}
        onRemoveDraftVariant={productModal.removeDraftVariant}
        onRequestDeleteVariant={productModal.requestDeleteVariant}
        onImageChange={productModal.handleImageChange}
        onImageDelete={(imageId) => void productModal.deleteProductImage(imageId)}
      />

      <AdminProductOverviewModal
        product={overviewModal.product}
        productDetails={overviewModal.productDetails}
        description={overviewModal.description}
        isLoading={overviewModal.isLoading}
        onClose={overviewModal.closeOverviewModal}
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

      <ConfirmationModal
        isOpen={Boolean(productModal.variantToDelete)}
        title="Delete variant"
        description={
          <p>
            Delete variant{' '}
            <strong>
              {productModal.variantToDelete?.color} /{' '}
              {productModal.variantToDelete?.storageCapacity}
            </strong>
            ?
          </p>
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        isLoading={productModal.isDeletingVariant}
        onCancel={productModal.closeDeleteVariantConfirmation}
        onConfirm={() => void productModal.deleteVariant()}
      />
    </section>
  );
};
