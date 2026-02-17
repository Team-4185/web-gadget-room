import type { FC } from 'react';
import { Container } from '@mui/material';

import { ProductGallery, ProductInfo } from '@/components';

import './ProductPage.css';

export const ProductPage: FC = () => {
  return (
    <section className="product">
      <Container disableGutters>
        <div className="product__layout">
          {/* Images */}
          <ProductGallery />

          {/* Info */}
          <ProductInfo />
        </div>
      </Container>
    </section>
  );
};
