import type { FC } from 'react';
import { Box, Container } from '@mui/material';

import { ProductGallery, ProductInfo } from '@/components';

export const ProductPage: FC = () => {
  return (
    <Container disableGutters maxWidth="xl" sx={{ padding: '20px' }}>
      <Box
        sx={{ display: 'flex', width: '100%', gap: '112px', justifyContent: 'center', mb: '98px' }}
      >
        {/* Images */}
        <ProductGallery />

        {/* Info */}
        <ProductInfo />
      </Box>
    </Container>
  );
};
