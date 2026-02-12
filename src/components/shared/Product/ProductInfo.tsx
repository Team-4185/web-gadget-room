import type { FC } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { SPECS, PRODUCT_META } from '@/core/constants/products';
import { Button } from '@/components/ui/Button/Button';
import { addProduct } from '@/core/store/slices/cartSlice';
import { useProduct } from '@/core/hooks/useProduct';
import { ProductTitlePrice } from '@/components/shared/Product/ProductTitlePrice';
import { ProductSpecItem } from '@/components/shared/Product/ProductSpecItem';
import { ProductMetaItem } from '@/components/shared/Product/ProductMetaItem';

export const ProductInfo: FC = () => {
  const product = useProduct();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addToCart = () => dispatch(addProduct(product));

  const buyNow = () => {
    addToCart();
    navigate('/cart');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '34px' }}>
      <ProductTitlePrice name={product.name} price={product.price} />
      <Box
        sx={{
          width: '536px',
          gap: '15px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {SPECS.map((spec) => (
          <ProductSpecItem
            key={spec.id}
            label={spec.label}
            value={spec.value}
            icon={spec.icon}
            alt={spec.alt}
          />
        ))}
      </Box>
      <Box
        sx={{
          width: '536px',
          fontWeight: '400',
          fontSize: '14px',
          lineHeight: '171%',
          letterSpacing: '0.03em',
          color: '#6c6c6c',
        }}
        component="p"
      >
        Enhanced capabilities thanks toan enlarged display of 6.7 inchesand work without
        rechargingthroughout the day. Incredible photosas in weak, yesand in bright lightusing the
        new systemwith two cameras{' '}
        <span
          style={{
            textDecoration: 'uderline',
            textDecorationSkipInk: 'none',
            color: '#2c2c2c',
          }}
        >
          more...
        </span>
      </Box>
      <Box sx={{ width: '100%', display: 'flex', gap: '16px' }}>
        <Button
          style={{
            border: '1px solid #979797',
            width: '257px',
            background: '#fff',
            lineHeight: '150%',
            color: '#000',
          }}
          onClick={addToCart}
        >
          Add To Cart
        </Button>

        <Button
          style={{
            border: '1px solid #979797',
            width: '257px',
            background: '#979797',
            lineHeight: '150%',
            color: '#fff',
          }}
          onClick={buyNow}
        >
          Buy Now
        </Button>
      </Box>
      <Box sx={{ display: 'flex', width: '100%', gap: '32px' }}>
        {PRODUCT_META.map((info) => (
          <ProductMetaItem
            key={info.id}
            label={info.label}
            value={info.value}
            icon={info.icon}
            alt={info.alt}
          />
        ))}
      </Box>
    </Box>
  );
};
