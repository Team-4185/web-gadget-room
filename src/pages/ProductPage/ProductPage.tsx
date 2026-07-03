import { useEffect, useMemo, useState, type FC } from 'react';
import { Container } from '@mui/material';

import { ProductGallery, ProductInfo } from '@/components';
import { useProduct } from '@/core/hooks';
import type { ApiPhoneColor, ApiStorageCapacity } from '@/core/types';
import {
  applySelectedProductVariant,
  getDefaultPhoneColor,
  getDefaultStorageCapacity,
} from '@/core/utils';

import './ProductPage.css';

export const ProductPage: FC = () => {
  const { product, specs, description, galleryImages, loading, error } = useProduct();
  const [selectedColor, setSelectedColor] = useState<ApiPhoneColor | undefined>(
    getDefaultPhoneColor(product.colors)
  );
  const [selectedStorage, setSelectedStorage] = useState<ApiStorageCapacity | undefined>(
    getDefaultStorageCapacity(product.storageCapacity)
  );

  useEffect(() => {
    const colors = product.colors ?? [];
    const stillAvailable = colors.some((color) => color.name === selectedColor?.name);

    if (!stillAvailable) {
      setSelectedColor(getDefaultPhoneColor(colors));
    }
  }, [product.colors, selectedColor?.name]);

  useEffect(() => {
    const storageCapacity = product.storageCapacity ?? [];
    const stillAvailable = storageCapacity.some((storage) => storage.name === selectedStorage?.name);

    if (!stillAvailable) {
      setSelectedStorage(getDefaultStorageCapacity(storageCapacity));
    }
  }, [product.storageCapacity, selectedStorage?.name]);

  const productWithSelectedVariants = useMemo(
    () => ({
      ...product,
      ...applySelectedProductVariant(product, selectedColor?.name, selectedStorage?.name),
    }),
    [product, selectedColor, selectedStorage]
  );

  return (
    <section className="product">
      <Container disableGutters>
        <div className="product__layout">
          {/* Images */}
          <ProductGallery images={galleryImages} />

          {/* Info */}
          <ProductInfo
            product={productWithSelectedVariants}
            specs={specs}
            description={description}
            loading={loading}
            error={error}
            colors={product.colors}
            selectedColor={productWithSelectedVariants.selectedColor}
            onColorSelect={setSelectedColor}
            selectedStorage={productWithSelectedVariants.selectedStorage}
            onStorageSelect={setSelectedStorage}
          />
        </div>
      </Container>
    </section>
  );
};
