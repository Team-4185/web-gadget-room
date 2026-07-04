import { useState } from 'react';
import { isAxiosError } from 'axios';
import { useSnackbar } from 'notistack';

import { EMPTY_ADMIN_PRODUCT_FORM } from '@/core/constants';
import { adminProductsService } from '@/core/services';
import type {
  AdminProductFormErrors,
  AdminProductModalTab,
  IAdminPanelManagedProduct,
  IAdminProductFormState,
} from '@/core/types';
import {
  buildAdminPhonePayload,
  mapAdminProductToDraft,
  mapPhoneToAdminProductDraft,
  validateAdminProductDraft,
  validateAdminProductVariants,
} from '@/core/utils';

import { useAdminProductImages } from './useAdminProductImages';
import { useAdminProductVariantDrafts } from './useAdminProductVariantDrafts';

interface IProps {
  onRefreshProducts: () => void;
}

export const useAdminProductModal = ({ onRefreshProducts }: IProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IAdminPanelManagedProduct | null>(null);
  const [activeTab, setActiveTab] = useState<AdminProductModalTab>('details');
  const [productToDelete, setProductToDelete] = useState<IAdminPanelManagedProduct | null>(null);
  const [draftProduct, setDraftProduct] =
    useState<IAdminProductFormState>(EMPTY_ADMIN_PRODUCT_FORM);
  const [fieldErrors, setFieldErrors] = useState<AdminProductFormErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const {
    imageFile,
    imageName,
    productImages,
    deleteProductImage,
    handleImageChange,
    loadProductImages,
    resetImageDraft,
    resetImages,
  } = useAdminProductImages({
    editingProduct,
    onRefreshProducts,
  });
  const {
    isDeletingVariant,
    variantErrors,
    variantToDelete,
    addVariant,
    closeDeleteVariantConfirmation,
    deleteVariant,
    handleVariantChange,
    persistEditedProductVariants,
    removeDraftVariant,
    requestDeleteVariant,
    resetVariants,
    setVariantErrors,
  } = useAdminProductVariantDrafts({
    draftProduct,
    editingProduct,
    onRefreshProducts,
    setDraftProduct,
  });

  const handleDraftChange = (field: keyof IAdminProductFormState, value: string) => {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    setDraftProduct((prev) => ({ ...prev, [field]: value }));
  };

  const resetModalState = () => {
    setEditingProduct(null);
    setActiveTab('details');
    setDraftProduct(EMPTY_ADMIN_PRODUCT_FORM);
    resetImages();
    setFieldErrors({});
    resetVariants();
  };

  const openAddModal = () => {
    resetModalState();
    setActiveTab('details');
    setIsAddModalOpen(true);
  };

  const openEditModal = async (product: IAdminPanelManagedProduct) => {
    setIsAddModalOpen(false);
    setEditingProduct(product);
    setActiveTab('details');
    setFieldErrors({});
    resetVariants();
    resetImages();
    resetImageDraft();

    try {
      const phone = await adminProductsService.getById(Number(product.id));
      setDraftProduct(mapPhoneToAdminProductDraft(phone, product));

      try {
        await loadProductImages(Number(product.id));
      } catch (error) {
        console.error('Failed to load product images', error);
        enqueueSnackbar('Failed to load product images.', { variant: 'warning' });
      }
    } catch {
      setDraftProduct(mapAdminProductToDraft(product));
      enqueueSnackbar('Failed to load full product details for editing.', { variant: 'warning' });
    }
  };

  const closeProductModal = (force = false) => {
    if (isSaving && !force) return;

    setIsAddModalOpen(false);
    resetModalState();
  };

  const openDeleteConfirmation = (product: IAdminPanelManagedProduct) => {
    setProductToDelete(product);
  };

  const closeDeleteConfirmation = () => {
    if (isDeleting) return;
    setProductToDelete(null);
  };

  const deleteProduct = async () => {
    if (!productToDelete) return;

    setIsDeleting(true);
    try {
      await adminProductsService.delete(Number(productToDelete.id));
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

  const saveProductModal = async () => {
    const resolvedStatus = editingProduct?.status ?? 'IN_STOCK';
    const payload = buildAdminPhonePayload(draftProduct, resolvedStatus);

    const validationErrors = validateAdminProductDraft(draftProduct, payload);
    const nextVariantErrors = validateAdminProductVariants(draftProduct.variants);
    const hasFieldErrors = Object.keys(validationErrors).length > 0;
    const hasVariantErrors = Object.keys(nextVariantErrors).length > 0;

    setFieldErrors(validationErrors);
    setVariantErrors(nextVariantErrors);

    if (hasFieldErrors || hasVariantErrors) {
      setActiveTab(hasFieldErrors ? 'details' : 'variants');
      enqueueSnackbar('Please fix the highlighted fields.', { variant: 'error' });
      return;
    }

    setIsSaving(true);
    try {
      if (editingProduct) {
        const productId = Number(editingProduct.id);
        const productPayload = Object.fromEntries(
          Object.entries(payload).filter(([key]) => key !== 'variants')
        ) as Omit<typeof payload, 'variants'>;

        await adminProductsService.update(productId, productPayload);
        await persistEditedProductVariants(productId);
        if (imageFile) {
          await adminProductsService.addImage(productId, imageFile);
        }
      } else {
        await adminProductsService.create(payload, imageFile);
      }
      closeProductModal(true);
      onRefreshProducts();
    } catch (error) {
      console.error(`Failed to ${editingProduct ? 'update' : 'create'} product`, error);
      if (isAxiosError(error)) {
        console.error('Product request response:', error.response?.data);
      }
      enqueueSnackbar(`Failed to ${editingProduct ? 'update' : 'create'} product.`, {
        variant: 'error',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isProductModalOpen: isAddModalOpen || Boolean(editingProduct),
    isEditingProduct: Boolean(editingProduct),
    draftProduct,
    activeTab,
    imageName,
    productImages,
    fieldErrors,
    variantErrors,
    productToDelete,
    variantToDelete,
    isDeleting,
    isDeletingVariant,
    openAddModal,
    openEditModal,
    setActiveTab,
    closeProductModal,
    saveProductModal,
    handleDraftChange,
    handleVariantChange,
    addVariant,
    removeDraftVariant,
    requestDeleteVariant,
    closeDeleteVariantConfirmation,
    deleteVariant,
    handleImageChange,
    deleteProductImage,
    openDeleteConfirmation,
    closeDeleteConfirmation,
    deleteProduct,
  };
};
