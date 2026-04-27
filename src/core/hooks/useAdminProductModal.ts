import { useState, type ChangeEvent } from 'react';
import { useSnackbar } from 'notistack';

import { EMPTY_ADMIN_PRODUCT_FORM } from '@/core/constants';
import { phonesService } from '@/core/services';
import type {
  AdminProductFormErrors,
  IAdminPanelManagedProduct,
  IAdminProductFormState,
  IAdminProductModalImage,
} from '@/core/types';
import {
  buildAdminPhonePayload,
  mapAdminProductToDraft,
  mapPhoneToAdminProductDraft,
  validateAdminProductDraft,
} from '@/core/utils';

interface IProps {
  onRefreshProducts: () => void;
}

export const useAdminProductModal = ({ onRefreshProducts }: IProps) => {
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

  const resetModalState = () => {
    setEditingProduct(null);
    setDraftProduct(EMPTY_ADMIN_PRODUCT_FORM);
    setImageName('');
    setImageFile(null);
    setProductImages([]);
    setFieldErrors({});
  };

  const openAddModal = () => {
    resetModalState();
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

  const closeProductModal = (force = false) => {
    if (isSaving && !force) return;

    setIsAddModalOpen(false);
    resetModalState();
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

  const saveProductModal = async () => {
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
      closeProductModal(true);
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

  return {
    isProductModalOpen: isAddModalOpen || Boolean(editingProduct),
    isEditingProduct: Boolean(editingProduct),
    draftProduct,
    imageName,
    productImages,
    fieldErrors,
    productToDelete,
    isDeleting,
    openAddModal,
    openEditModal,
    closeProductModal,
    saveProductModal,
    handleDraftChange,
    handleImageChange,
    deleteProductImage,
    openDeleteConfirmation,
    closeDeleteConfirmation,
    deleteProduct,
  };
};
