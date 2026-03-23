import { useEffect, useState, type FC, type SyntheticEvent } from 'react';

import { FALLBACK_PRODUCT_IMAGE } from '@/core/constants';

import './ProductGallery.css';

interface ProductGalleryProps {
  images: string[];
}

export const ProductGallery: FC<ProductGalleryProps> = ({ images }) => {
  const safeImages = images.length ? images : [FALLBACK_PRODUCT_IMAGE];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [safeImages]);

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = FALLBACK_PRODUCT_IMAGE;
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
      <img
        className="product-gallery__main-image"
        src={safeImages[activeIndex] ?? FALLBACK_PRODUCT_IMAGE}
        onError={handleImageError}
        alt="Product image"
      />
    </div>
  );
};
