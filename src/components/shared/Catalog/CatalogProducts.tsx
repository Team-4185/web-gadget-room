import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ProductCard } from '../../ui/ProductCard/ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  sale?: boolean;
  img: string;
  hit?: boolean;
  newProduct?: boolean;
  inStock?: boolean;
  preOrder?: boolean;
  reviews?: number;
}

interface CatalogProductsProps {
  items: Product[];
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
