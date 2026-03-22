import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

import { PRODUCT_META, PRODUCT_SPECS_META } from '@/core/constants';
import { useAppDispatch, cartActions } from '@/core/store';
import type { UseProductResult } from '@/core/types';
import { ProductTitlePrice, ProductSpecItem, ProductMetaItem, Button } from '@/components';

import './ProductInfo.css';

type ProductInfoProps = Omit<UseProductResult, 'galleryImages'>;

export const ProductInfo: FC<ProductInfoProps> = ({ product, specs, description, loading, error }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const addToCart = () => dispatch(cartActions.addProduct(product));

  const buyNow = () => {
    addToCart();
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="product-info">
        <Typography component="p">Loading product...</Typography>
      </div>
    );
  }

  return (
    <div className="product-info">
      <ProductTitlePrice name={product.name} price={product.price} />
      {error && <Typography color="error">{error}</Typography>}
      <div className="product-info__specs">
        {specs.map((spec, index) => (
          <ProductSpecItem
            key={spec.label}
            label={spec.label}
            value={spec.value}
            icon={PRODUCT_SPECS_META[index]?.icon ?? PRODUCT_SPECS_META[0].icon}
            alt={PRODUCT_SPECS_META[index]?.alt ?? PRODUCT_SPECS_META[0].alt}
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
        {description ||
          'Enhanced capabilities thanks to an enlarged display and all-day battery life.'}{' '}
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
