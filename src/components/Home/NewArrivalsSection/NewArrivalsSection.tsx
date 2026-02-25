import { Typography } from '@mui/material';

import { ProductCard } from '@/components';
import type { IProduct } from '@/core/types';

import './NewArrivalsSection.css';

type Props = {
  products: IProduct[];
  onOpenProduct: (product: IProduct) => void;
};

export const NewArrivalsSection = ({ products, onOpenProduct }: Props) => {
  return (
    <div className="new-arrivals">
      <Typography variant="h3" component="h3" sx={{ fontWeight: 700, lineHeight: 1 }}>
        New Arrivals
      </Typography>

      <div className="new-arrivals__list">
        {products
          .filter((product) => product.id)
          .slice(0, 4)
          .map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onOpenProduct(product)}
            />
          ))}
      </div>
    </div>
  );
};
