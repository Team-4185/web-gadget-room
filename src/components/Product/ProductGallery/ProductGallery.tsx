import { useEffect, useState, type FC, type SyntheticEvent } from 'react';

import { FALLBACK_IMAGE } from '@/core/constants';
import type { ApiPhoneColor } from '@/core/types';

import './ProductGallery.css';

interface ProductGalleryProps {
  images: string[];
  colors?: ApiPhoneColor[];
}

export const ProductGallery: FC<ProductGalleryProps> = ({ images, colors = [] }) => {
  const safeImages = images.length ? images : [FALLBACK_IMAGE];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [safeImages]);

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <div className="product-gallery">
      <div className="product-gallery__thumbnails">
        {safeImages.map((img, index) => (
          <img
            className={`product-gallery__thumbnail ${activeIndex === index ? 'active' : ''}`}
            key={`${img}-${index}`}
            src={img}
            onClick={() => setActiveIndex(index)}
            onError={handleImageError}
            alt={`Product thumbnail ${index + 1}`}
          />
        ))}
      </div>
      <div className="product-gallery__main">
        <img
          className="product-gallery__main-image"
          src={safeImages[activeIndex] ?? FALLBACK_IMAGE}
          onError={handleImageError}
          alt="Product image"
        />

        {colors.length ? (
          <div className="product-gallery__colors" aria-label="Available colors">
            {colors.map((color) => (
              <span
                key={color.name}
                className="product-gallery__color"
                style={{ backgroundColor: color.hexCode }}
                title={color.displayName}
                aria-label={color.displayName}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
