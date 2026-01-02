import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ProductCard } from '../../ui/ProductCard/ProductCard';
import type { IProduct } from '../../../core/types/product';

interface CatalogProductsProps {
  items: IProduct[];
}

export const CatalogProducts = ({ items }: CatalogProductsProps) => {
  const navigate = useNavigate();

  return (
    <Box className="catalog-products">
      {items.map((product) => (
        <ProductCard
          home
          key={product.id}
          id={product.id}
          image={product.img}
          name={product.name}
          price={product.price}
          sale={product.sale}
          hit={product.hit}
          newProduct={product.newProduct}
          onClick={() => navigate(`/product/${product.id}`, { state: product })}
        />
      ))}
    </Box>
  );
};
