import { useEffect, useMemo, useState, type FC } from 'react';
import { Container } from '@mui/material';

import { ProductGallery, ProductInfo } from '@/components';
import { useProduct } from '@/core/hooks';
import type { ApiPhoneColor } from '@/core/types';
import { getDefaultPhoneColor } from '@/core/utils';

import './ProductPage.css';

export const ProductPage: FC = () => {
  const { product, specs, description, galleryImages, loading, error } = useProduct();
  const [selectedColor, setSelectedColor] = useState<ApiPhoneColor | undefined>(
    getDefaultPhoneColor(product.colors)
  );

  useEffect(() => {
    const colors = product.colors ?? [];
    const stillAvailable = colors.some((color) => color.name === selectedColor?.name);

    if (!stillAvailable) {
      setSelectedColor(getDefaultPhoneColor(colors));
    }
  }, [product.colors, selectedColor?.name]);

  const productWithSelectedColor = useMemo(
    () => ({
      ...product,
      selectedColor,
    }),
    [product, selectedColor]
  );

  return (
    <section className="product">
      <Container disableGutters>
        <div className="product__layout">
          {/* Images */}
          <ProductGallery
            images={galleryImages}
            colors={product.colors}
            selectedColorName={selectedColor?.name}
            onColorSelect={setSelectedColor}
          />

          {/* Info */}
          <ProductInfo
            product={productWithSelectedColor}
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
