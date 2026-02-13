import { Box, Typography } from '@mui/material';

import { ProductCard } from '@/components';
import type { IProduct } from '@/core/types';

type Props = {
  products: IProduct[];
  onOpenProduct: (product: IProduct) => void;
};

export const NewArrivalsSection = ({ products, onOpenProduct }: Props) => {
  return (
    <Box sx={{ width: '100%', height: '634px', padding: '100px 80px' }}>
      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontWeight: '700',
          lineHeight: 1,
        }}
      >
        New Arrivals
      </Typography>

      <Box
        sx={{ display: 'flex', width: '100%', mt: '50px', justifyContent: 'center', gap: '26px' }}
      >
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
      </Box>
    </Box>
  );
};
