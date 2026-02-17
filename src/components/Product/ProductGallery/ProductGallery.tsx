import { useState, type FC } from 'react';

import { PRODUCT_GALLERY_IMAGES } from '@/core/constants';

import './ProductGallery.css';

export const ProductGallery: FC = () => {
  const [activeImg, setActiveImg] = useState(PRODUCT_GALLERY_IMAGES[0].src);

  return (
    <div className="product-gallery">
      <div className="product-gallery__thumbnails">
        {PRODUCT_GALLERY_IMAGES.map((img) => (
          <img
            className={`product-gallery__thumbnail ${activeImg === img.src ? 'active' : ''}`}
            key={img.id}
            src={img.src}
            onClick={() => setActiveImg(img.src)}
            alt={img.alt}
          />
        ))}
      </div>
      <img className="product-gallery__main-image" src={activeImg} alt="Big Image" />
    </div>
  );
};
