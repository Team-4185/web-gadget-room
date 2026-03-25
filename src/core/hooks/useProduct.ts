import { useLocation, useParams } from 'react-router';

import { PRODUCTS } from '@/core/constants';
import type { IProduct } from '@/core/types';

export const useProduct = (): IProduct => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const productFromState = location.state;
  const product = productFromState || PRODUCTS.find((p) => p.id === Number(id));

  return product;
};
