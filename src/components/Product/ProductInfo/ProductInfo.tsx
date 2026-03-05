import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

import { SPECS, PRODUCT_META } from '@/core/constants';
import { useAppDispatch, cartActions } from '@/core/store';
import { useProduct } from '@/core/hooks';
import { ProductTitlePrice, ProductSpecItem, ProductMetaItem, Button } from '@/components';

import './ProductInfo.css';

export const ProductInfo: FC = () => {
  const product = useProduct();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const addToCart = () => dispatch(cartActions.addProduct(product));

  const buyNow = () => {
    addToCart();
    navigate('/cart');
  };

  return (
    <div className="product-info">
      <ProductTitlePrice name={product.name} price={product.price} />
      <div className="product-info__specs">
        {SPECS.map((spec) => (
          <ProductSpecItem
            key={spec.id}
            label={spec.label}
            value={spec.value}
            icon={spec.icon}
            alt={spec.alt}
          />
        ))}
      </div>
      <Typography
        sx={{
          fontSize: '14px',
          lineHeight: '171.429%',
          letterSpacing: '0.42px',
          color: 'var(--product-description-color)',
        }}
        component="p"
      >
        Enhanced capabilities thanks to an enlarged display of 6.7 inches and work without
        recharging throughout the day. Incredible photos as in weak, yes and in bright light using
        the new system with two cameras{' '}
        <span className="product-info__description-link">more...</span>
      </Typography>
      <div className="product-info__actions">
        <Button maxWidth="257px" height="56px" onClick={addToCart}>
          Add To Cart
        </Button>

        <Button maxWidth="257px" height="56px" onClick={buyNow}>
          Buy Now
        </Button>
      </div>
      <div className="product-info__meta">
        {PRODUCT_META.map((info) => (
          <ProductMetaItem
            key={info.id}
            label={info.label}
            value={info.value}
            icon={info.icon}
            alt={info.alt}
          />
        ))}
      </div>
    </div>
  );
};
