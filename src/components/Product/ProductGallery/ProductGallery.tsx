import { useEffect, useMemo, useState, type FC, type SyntheticEvent } from 'react';

import { FALLBACK_IMAGE } from '@/core/constants';
import type { ApiPhoneColor } from '@/core/types';

import './ProductGallery.css';

interface ProductGalleryProps {
  images: string[];
  colors?: ApiPhoneColor[];
  selectedColorName?: string;
  onColorSelect?: (color: ApiPhoneColor) => void;
}

export const ProductGallery: FC<ProductGalleryProps> = ({
  images,
  colors = [],
  selectedColorName,
  onColorSelect,
}) => {
  const safeImages = useMemo(() => (images.length ? images : [FALLBACK_IMAGE]), [images]);
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
              <button
                type="button"
                key={color.name}
                className={`product-gallery__color ${
                  selectedColorName === color.name ? 'product-gallery__color--selected' : ''
                }`}
                style={{ backgroundColor: color.hexCode }}
                title={color.displayName}
                aria-label={color.displayName}
                aria-pressed={selectedColorName === color.name}
                onClick={() => onColorSelect?.(color)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
