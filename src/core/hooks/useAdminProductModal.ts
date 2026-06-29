import { useState, type ChangeEvent } from 'react';
import { useSnackbar } from 'notistack';

import { EMPTY_ADMIN_PRODUCT_FORM } from '@/core/constants';
import { adminProductsService, phonesService } from '@/core/services';
import type {
  AdminProductFormErrors,
  AdminProductVariantDraft,
  AdminProductVariantErrors,
  AdminProductVariantField,
  AdminProductModalTab,
  IAdminPanelManagedProduct,
  IAdminProductFormState,
  IAdminProductModalImage,
} from '@/core/types';
import {
  buildAdminPhonePayload,
  buildVariantPayloads,
  createAdminProductVariantDraft,
  mapAdminProductToDraft,
  mapPhoneToAdminProductDraft,
  validateAdminProductDraft,
  validateAdminProductVariants,
} from '@/core/utils';

interface IProps {
  onRefreshProducts: () => void;
}

export const useAdminProductModal = ({ onRefreshProducts }: IProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IAdminPanelManagedProduct | null>(null);
  const [activeTab, setActiveTab] = useState<AdminProductModalTab>('details');
  const [imageName, setImageName] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [productImages, setProductImages] = useState<IAdminProductModalImage[]>([]);
  const [productToDelete, setProductToDelete] = useState<IAdminPanelManagedProduct | null>(null);
  const [draftProduct, setDraftProduct] =
    useState<IAdminProductFormState>(EMPTY_ADMIN_PRODUCT_FORM);
  const [fieldErrors, setFieldErrors] = useState<AdminProductFormErrors>({});
  const [variantErrors, setVariantErrors] = useState<AdminProductVariantErrors>({});
  const [variantToDelete, setVariantToDelete] = useState<AdminProductVariantDraft | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeletingVariant, setIsDeletingVariant] = useState(false);
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
    setActiveTab('details');
    setDraftProduct(EMPTY_ADMIN_PRODUCT_FORM);
    setImageName('');
    setImageFile(null);
    setProductImages([]);
    setFieldErrors({});
    setVariantErrors({});
    setVariantToDelete(null);
  };

  const openAddModal = () => {
    resetModalState();
    setActiveTab('details');
    setIsAddModalOpen(true);
  };

  const loadProductImages = async (productId: number) => {
    const images = await adminProductsService.getImages(productId);
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
    setActiveTab('details');
    setFieldErrors({});
    setVariantErrors({});
    setVariantToDelete(null);
    setImageFile(null);
    setImageName('');
    setProductImages([]);

    try {
      const phone = await adminProductsService.getById(Number(product.id));
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
      await adminProductsService.deleteImage(Number(editingProduct.id), imageId);
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

  const handleVariantChange = (
    clientId: string,
    field: AdminProductVariantField,
    value: string
  ) => {
    if (variantErrors[clientId]?.[field]) {
      setVariantErrors((prev) => ({
        ...prev,
        [clientId]: { ...prev[clientId], [field]: undefined },
      }));
    }

    setDraftProduct((prev) => ({
      ...prev,
      variants: prev.variants.map((variant) =>
        variant.clientId === clientId ? { ...variant, [field]: value } : variant
      ),
    }));
  };

  const addVariant = () => {
    setDraftProduct((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        createAdminProductVariantDraft(prev.variants.length + 1, {
          price: prev.variants.at(-1)?.price ?? '',
          stock: '0',
        }),
      ],
    }));
  };

  const removeDraftVariant = (clientId: string) => {
    setDraftProduct((prev) => {
      if (prev.variants.length <= 1) return prev;

      return {
        ...prev,
        variants: prev.variants.filter((variant) => variant.clientId !== clientId),
      };
    });
  };

  const requestDeleteVariant = (variant: AdminProductVariantDraft) => {
    if (draftProduct.variants.length <= 1) return;

    if (!variant.isPersisted || !variant.id) {
      removeDraftVariant(variant.clientId);
      return;
    }

    setVariantToDelete(variant);
  };

  const closeDeleteVariantConfirmation = () => {
    if (isDeletingVariant) return;
    setVariantToDelete(null);
  };

  const deleteVariant = async () => {
    if (!editingProduct || !variantToDelete?.id) return;

    setIsDeletingVariant(true);
    try {
      await adminProductsService.deleteVariant(Number(editingProduct.id), variantToDelete.id);
      setDraftProduct((prev) => ({
        ...prev,
        variants: prev.variants.filter(
          (variant) => variant.clientId !== variantToDelete.clientId
        ),
      }));
      setVariantToDelete(null);
      enqueueSnackbar('Variant deleted.', { variant: 'success' });
      onRefreshProducts();
    } catch (error) {
      console.error('Failed to delete product variant', error);
      enqueueSnackbar('Failed to delete variant.', { variant: 'error' });
    } finally {
      setIsDeletingVariant(false);
    }
  };

  const persistEditedProductVariants = async (productId: number) => {
    const variantPayloads = buildVariantPayloads(draftProduct);

    await Promise.all(
      draftProduct.variants.map((variant, index) =>
        variant.isPersisted && variant.id
          ? adminProductsService.updateVariant(productId, variant.id, variantPayloads[index])
          : adminProductsService.addVariant(productId, variantPayloads[index])
      )
    );
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
        const { variants: _variants, ...productPayload } = payload;

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
