import { useState, type Dispatch, type SetStateAction } from 'react';
import { useSnackbar } from 'notistack';

import { adminProductsService } from '@/core/services';
import type {
  AdminProductVariantDraft,
  AdminProductVariantErrors,
  AdminProductVariantField,
  IAdminPanelManagedProduct,
  IAdminProductFormState,
} from '@/core/types';
import { buildVariantPayloads, createAdminProductVariantDraft } from '@/core/utils';

type UseAdminProductVariantDraftsOptions = {
  draftProduct: IAdminProductFormState;
  editingProduct: IAdminPanelManagedProduct | null;
  onRefreshProducts: () => void;
  setDraftProduct: Dispatch<SetStateAction<IAdminProductFormState>>;
};

export const useAdminProductVariantDrafts = ({
  draftProduct,
  editingProduct,
  onRefreshProducts,
  setDraftProduct,
}: UseAdminProductVariantDraftsOptions) => {
  const [variantErrors, setVariantErrors] = useState<AdminProductVariantErrors>({});
  const [variantToDelete, setVariantToDelete] = useState<AdminProductVariantDraft | null>(null);
  const [isDeletingVariant, setIsDeletingVariant] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const resetVariants = () => {
    setVariantErrors({});
    setVariantToDelete(null);
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
        variants: prev.variants.filter((variant) => variant.clientId !== variantToDelete.clientId),
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

  return {
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
  };
};
