import { useMemo, useState, type ChangeEvent, type FC } from 'react';
import { Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import type {
  AdminProductFormErrors,
  AdminProductStatus,
  IAdminProductFormState,
  IAdminPanelManagedProduct,
} from '@/core/types';
import {
  ADMIN_PRODUCT_FIELD_TOOLTIPS,
  ADMIN_PRODUCT_STATUS_LABELS,
  ADMIN_PRODUCT_STATUS_OPTIONS,
  EMPTY_ADMIN_PRODUCT_FORM,
} from '@/core/constants';
import {
  buildAdminPhonePayload,
  buildAdminProductBrandOptions,
  mapAdminProductToDraft,
  mapPhoneToAdminProductDraft,
  validateAdminProductDraft,
} from '@/core/utils';
import { Button, Search, Select } from '@/components/ui';
import { ConfirmationModal } from '@/components/shared';
import { Edit, Plus, Trash, Visibility } from '@/assets';
import { phonesService } from '@/core/services';
import {
  AdminProductModal,
  type IAdminProductModalImage,
} from '@/components/AdminPanel/Products/AdminProductModal/AdminProductModal';

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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IAdminPanelManagedProduct | null>(null);
  const [imageName, setImageName] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [productImages, setProductImages] = useState<IAdminProductModalImage[]>([]);
  const [productToDelete, setProductToDelete] = useState<IAdminPanelManagedProduct | null>(null);
  const [draftProduct, setDraftProduct] =
    useState<IAdminProductFormState>(EMPTY_ADMIN_PRODUCT_FORM);
  const [fieldErrors, setFieldErrors] = useState<AdminProductFormErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const brandOptions = useMemo(
    () => buildAdminProductBrandOptions(availableBrands),
    [availableBrands]
  );

  const handleDraftChange = (field: keyof IAdminProductFormState, value: string) => {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    setDraftProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImageFile(file ?? null);
    setImageName(file?.name ?? '');
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setDraftProduct(EMPTY_ADMIN_PRODUCT_FORM);
    setImageName('');
    setImageFile(null);
    setProductImages([]);
    setFieldErrors({});
    setIsAddModalOpen(true);
  };

  const loadProductImages = async (productId: number) => {
    const images = await phonesService.getImages(productId);
    const imageUrlResults = await Promise.allSettled(
      images.map((image) => phonesService.getImageObjectUrl(image.url))
    );

    setProductImages(
      images.map((image, index) => ({
        id: image.id,
        name: image.name,
        src:
          imageUrlResults[index]?.status === 'fulfilled' ? imageUrlResults[index].value : image.url,
      }))
    );
  };

  const openEditModal = async (product: IAdminPanelManagedProduct) => {
    setIsAddModalOpen(false);
    setEditingProduct(product);
    setFieldErrors({});
    setImageFile(null);
    setImageName('');
    setProductImages([]);

    try {
      const phone = await phonesService.getById(Number(product.id));
      setDraftProduct(mapPhoneToAdminProductDraft(phone, product));

      try {
        await loadProductImages(Number(product.id));
      } catch (error) {
        console.error('Failed to load product images', error);
        enqueueSnackbar('Failed to load product images.', { variant: 'warning' });
      }
    } catch (error) {
      setDraftProduct(mapAdminProductToDraft(product));
      enqueueSnackbar('Failed to load full product details for editing.', { variant: 'warning' });
    }
  };

  const closeAddModal = (force = false) => {
    if (isSaving && !force) return;

    setIsAddModalOpen(false);
    setEditingProduct(null);
    setDraftProduct(EMPTY_ADMIN_PRODUCT_FORM);
    setImageName('');
    setImageFile(null);
    setProductImages([]);
    setFieldErrors({});
  };

  const deleteProductImage = async (imageId: number) => {
    if (!editingProduct) return;

    try {
      await phonesService.deleteImage(Number(editingProduct.id), imageId);
      setProductImages((prev) => prev.filter((image) => image.id !== imageId));
      onRefreshProducts();
    } catch (error) {
      console.error('Failed to delete product image', error);
      enqueueSnackbar('Failed to delete product image.', { variant: 'error' });
    }
  };

  const closeDeleteConfirmation = () => {
    if (isDeleting) return;
    setProductToDelete(null);
  };

  const deleteProduct = async () => {
    if (!productToDelete) return;

    setIsDeleting(true);
    try {
      await phonesService.delete(Number(productToDelete.id));
      enqueueSnackbar('Product deleted.', { variant: 'success' });
      setProductToDelete(null);
      onRefreshProducts();
    } catch (error) {
      console.error('Failed to delete product', error);
      enqueueSnackbar('Failed to delete product.', { variant: 'error' });
    } finally {
      setIsDeleting(false);
    }
  };

  const saveAddModal = async () => {
    const resolvedStatus = editingProduct?.status ?? 'IN_STOCK';
    const payload = buildAdminPhonePayload(draftProduct, resolvedStatus);

    const validationErrors = validateAdminProductDraft(draftProduct, payload);
    if (Object.keys(validationErrors).length) {
      setFieldErrors(validationErrors);
      enqueueSnackbar('Please fix the highlighted fields.', { variant: 'error' });
      return;
    }

    setIsSaving(true);
    try {
      if (editingProduct) {
        await phonesService.update(Number(editingProduct.id), payload);
        if (imageFile) {
          await phonesService.addImage(Number(editingProduct.id), imageFile);
        }
      } else {
        await phonesService.create(payload, imageFile);
      }
      closeAddModal(true);
      onRefreshProducts();
    } catch (error) {
      console.error(`Failed to ${editingProduct ? 'update' : 'create'} product`, error);
      if (error && typeof error === 'object' && 'response' in error) {
        console.error('Product request response:', (error as any).response?.data);
      }
      enqueueSnackbar(`Failed to ${editingProduct ? 'update' : 'create'} product.`, {
        variant: 'error',
      });
    } finally {
      setIsSaving(false);
    }
  };

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
          onClick={openAddModal}
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
              <tr key={product.id}>
                <td className="admin-product-management__product-cell">
                  <img src={product.image} alt={product.title} />
                  <Typography variant="subtitle2" component="span" sx={{ fontWeight: 600 }}>
                    {product.title}
                  </Typography>
                </td>
                <td>{product.sku}</td>
                <td>{product.brand}</td>
                <td className="is-strong">{product.price}</td>
                <td className="is-strong">{product.stock}</td>
                <td>
                  <span className={`admin-product-management__status is-${product.status}`}>
                    {ADMIN_PRODUCT_STATUS_LABELS[product.status]}
                  </span>
                </td>
                <td>
                  <div className="admin-product-management__actions">
                    <button type="button" aria-label={`View ${product.title}`}>
                      <Visibility />
                    </button>
                    <button
                      type="button"
                      aria-label={`Edit ${product.title}`}
                      onClick={() => void openEditModal(product)}
                    >
                      <Edit />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${product.title}`}
                      onClick={() => setProductToDelete(product)}
                    >
                      <Trash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-product-management__footer">
        <Typography variant="body2" component="p">
          Total products: <span>{totalProducts}</span>
          {` - Page ${currentPage} of ${totalPages}`}
        </Typography>
        <div className="admin-product-management__pager">
          <button type="button" onClick={onPreviousPage} disabled={isFirstPage || isLoading}>
            Back
          </button>
          <button
            type="button"
            className="is-primary"
            onClick={onNextPage}
            disabled={isLastPage || isLoading}
          >
            Next
          </button>
        </div>
      </div>

      <AdminProductModal
        isOpen={isAddModalOpen || Boolean(editingProduct)}
        title={editingProduct ? 'Edit product' : 'Add a new product'}
        submitLabel={editingProduct ? 'Save edit' : 'Save'}
        values={draftProduct}
        imageName={imageName}
        uploadLabel={editingProduct ? 'Edit an image' : 'Upload an image'}
        editDescriptionLabel={editingProduct ? 'Edit description' : 'Description'}
        images={editingProduct ? productImages : undefined}
        fieldErrors={fieldErrors}
        fieldTooltips={ADMIN_PRODUCT_FIELD_TOOLTIPS}
        onClose={closeAddModal}
        onSave={() => void saveAddModal()}
        onValueChange={handleDraftChange}
        onImageChange={handleImageChange}
        onImageDelete={(imageId) => void deleteProductImage(imageId)}
      />

      <ConfirmationModal
        isOpen={Boolean(productToDelete)}
        title="Delete a product"
        description={
          <p>
            Are you sure you want to erase <strong>{productToDelete?.title}</strong>? This action
            cannot be undone.
          </p>
        }
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        isLoading={isDeleting}
        onCancel={closeDeleteConfirmation}
        onConfirm={() => void deleteProduct()}
      />
    </section>
  );
};
