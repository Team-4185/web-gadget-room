import { useState } from 'react';
import { useSnackbar } from 'notistack';

import { adminProductsService } from '@/core/services';
import type { ApiPhone, IAdminPanelManagedProduct } from '@/core/types';

export const useAdminProductOverviewModal = () => {
  const [product, setProduct] = useState<IAdminPanelManagedProduct | null>(null);
  const [productDetails, setProductDetails] = useState<ApiPhone | null>(null);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const openOverviewModal = async (selectedProduct: IAdminPanelManagedProduct) => {
    setProduct(selectedProduct);
    setProductDetails(null);
    setDescription('');
    setIsLoading(true);

    try {
      const phone = await adminProductsService.getById(Number(selectedProduct.id));
      setProductDetails(phone);
      setDescription(phone.description?.trim() || 'No description provided.');
    } catch (error) {
      console.error('Failed to load product overview details', error);
      setDescription('No description provided.');
      enqueueSnackbar('Failed to load product description.', { variant: 'warning' });
    } finally {
      setIsLoading(false);
    }
  };

  const closeOverviewModal = () => {
    setProduct(null);
    setProductDetails(null);
    setDescription('');
    setIsLoading(false);
  };

  return {
    product,
    productDetails,
    description,
    isLoading,
    openOverviewModal,
    closeOverviewModal,
  };
};
