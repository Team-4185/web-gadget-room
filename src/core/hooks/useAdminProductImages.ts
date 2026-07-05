import { useState, type ChangeEvent } from 'react';
import { useSnackbar } from 'notistack';

import { adminProductsService, phonesService } from '@/core/services';
import type { IAdminPanelManagedProduct, IAdminProductModalImage } from '@/core/types';
import { logger } from '@/core/utils';

type UseAdminProductImagesOptions = {
  editingProduct: IAdminPanelManagedProduct | null;
  onRefreshProducts: () => void;
};

export const useAdminProductImages = ({
  editingProduct,
  onRefreshProducts,
}: UseAdminProductImagesOptions) => {
  const [imageName, setImageName] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [productImages, setProductImages] = useState<IAdminProductModalImage[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImageFile(file ?? null);
    setImageName(file?.name ?? '');
  };

  const resetImages = () => {
    setImageName('');
    setImageFile(null);
    setProductImages([]);
  };

  const resetImageDraft = () => {
    setImageName('');
    setImageFile(null);
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

  const deleteProductImage = async (imageId: number) => {
    if (!editingProduct) return;

    try {
      await adminProductsService.deleteImage(Number(editingProduct.id), imageId);
      setProductImages((prev) => prev.filter((image) => image.id !== imageId));
      onRefreshProducts();
    } catch (error) {
      logger.error('Failed to delete product image', error, {
        imageId,
        productId: editingProduct.id,
      });
      enqueueSnackbar('Failed to delete product image.', { variant: 'error' });
    }
  };

  return {
    imageFile,
    imageName,
    productImages,
    deleteProductImage,
    handleImageChange,
    loadProductImages,
    resetImageDraft,
    resetImages,
  };
};
