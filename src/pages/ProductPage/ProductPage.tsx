import type { FC } from 'react';
import { Container } from '@mui/material';

import { ProductGallery, ProductInfo } from '@/components';
import { useProduct } from '@/core/hooks';

import './ProductPage.css';

export const ProductPage: FC = () => {
  const { product, specs, description, galleryImages, loading, error } = useProduct();

  return (
    <section className="product">
      <Container disableGutters>
        <div className="product__layout">
          {/* Images */}
          <ProductGallery images={galleryImages} />

          {/* Info */}
          <ProductInfo
            product={product}
            specs={specs}
            description={description}
            loading={loading}
            error={error}
          />
        </div>
      </Container>
    </section>
  );
};
