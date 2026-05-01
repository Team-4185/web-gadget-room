import { useState } from 'react';
import { useSnackbar } from 'notistack';

import { phonesService } from '@/core/services';
import type { IAdminPanelManagedProduct } from '@/core/types';

export const useAdminProductOverviewModal = () => {
  const [product, setProduct] = useState<IAdminPanelManagedProduct | null>(null);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const openOverviewModal = async (selectedProduct: IAdminPanelManagedProduct) => {
    setProduct(selectedProduct);
    setDescription('');
    setIsLoading(true);

    try {
      const phone = await phonesService.getById(Number(selectedProduct.id));
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
    setDescription('');
    setIsLoading(false);
  };

  return {
    product,
    description,
    isLoading,
    openOverviewModal,
    closeOverviewModal,
  };
};
