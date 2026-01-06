import { Box } from '@mui/material';

import { ProductCard } from '../../../ui/ProductCard/ProductCard';
import type { Product } from '../../../../core/types/home';

import './NewArrivalsSection.css';

type Props = {
  products: Product[];
  onOpenProduct: (product: Product) => void;
};

export const NewArrivalsSection = ({ products, onOpenProduct }: Props) => {
  return (
    <Box className="arrivals_container">
      <span className="arrivals_title">New Arrivals</span>
      <Box className="arrivals_cards_box">
        {products
          .filter((product) => product.newProduct)
          .slice(0, 4)
          .map((product) => (
            <ProductCard
              home
              key={product.id}
              image={product.img}
              {...product}
              onClick={() => onOpenProduct(product)}
            />
          ))}
      </Box>
    </Box>
  );
};
