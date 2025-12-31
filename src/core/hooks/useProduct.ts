import { useLocation, useParams } from 'react-router-dom';

import { PRODUCTS } from '../constants/products';

export const useProduct = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const productFromState = location.state;
  const product = productFromState || PRODUCTS.find((p) => p.id === Number(id));

  return product;
};
