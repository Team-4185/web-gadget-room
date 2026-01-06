import { Box } from '@mui/material';

import { ProductCard } from '@/components/ui/ProductCard/ProductCard';
import type { IProduct } from '@/core/types/product';

type Props = {
  products: IProduct[];
  onOpenProduct: (product: IProduct) => void;
};

export const NewArrivalsSection = ({ products, onOpenProduct }: Props) => {
  return (
    <Box sx={{ width: '100%', height: '634px', padding: '60px 80px' }}>
      <span style={{ fontWeight: '700', fontSize: '48px', lineHeight: '0%', color: '#000' }}>
        New Arrivals
      </span>

      <Box sx={{ display: 'flex', width: '100%', mt: '50px', justifyContent: 'space-between' }}>
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
