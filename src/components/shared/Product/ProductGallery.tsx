import { useState, type FC } from 'react';
import { Box } from '@mui/material';

import { PRODUCT_GALLERY_IMAGES } from '../../../core/constants/products';

export const ProductGallery: FC = () => {
  const [activeImg, setActiveImg] = useState(PRODUCT_GALLERY_IMAGES[0].src);

  return (
    <Box sx={{ display: 'flex', gap: '48px', width: '536px', alignItems: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '75px',
          gap: '24px',
          height: '444px',
          alignItems: 'center',
        }}
      >
        {PRODUCT_GALLERY_IMAGES.map((img) => (
          <img
            key={img.id}
            style={{ width: '75px', height: '93px', cursor: 'pointer' }}
            src={img.src}
            onClick={() => setActiveImg(img.src)}
            alt={img.alt}
          />
        ))}
      </Box>
      <img style={{ width: '413px', height: '516px' }} src={activeImg} alt="Big Image" />
    </Box>
  );
};
