import { useEffect, useRef, useState, type FC } from 'react';
import { useNavigate } from 'react-router';
import { Typography } from '@mui/material';

import { PRODUCT_SPECS_META } from '@/core/constants';
import { useAppDispatch, cartActions } from '@/core/store';
import type { IProduct } from '@/core/types';
import { ProductTitlePrice, ProductSpecItem, Button } from '@/components';

import './ProductInfo.css';

interface ProductInfoProps {
  product: IProduct;
  specs: { label: string; value: string }[];
  description: string;
  loading: boolean;
  error: string | null;
}

export const ProductInfo: FC<ProductInfoProps> = ({
  product,
  specs,
  description,
  loading,
  error,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const measureRef = useRef<HTMLParagraphElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);

  const descriptionText =
    description || 'Enhanced capabilities thanks to an enlarged display and all-day battery life.';

  useEffect(() => {
    setIsExpanded(false);
  }, [descriptionText]);

  useEffect(() => {
    const measureOverflow = () => {
      const element = measureRef.current;
      if (!element) return;

      const lineHeight = Number.parseFloat(window.getComputedStyle(element).lineHeight);
      if (!Number.isFinite(lineHeight) || lineHeight <= 0) return;

      setShowToggle(element.scrollHeight > lineHeight * 3 + 1);
    };

    measureOverflow();
    window.addEventListener('resize', measureOverflow);

    return () => {
      window.removeEventListener('resize', measureOverflow);
    };
  }, [descriptionText]);

  const addToCart = async () => dispatch(cartActions.addProduct(product));

  const buyNow = async () => {
    await addToCart();
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
        ref={measureRef}
        className="product-info__description-measure"
        sx={{
          fontSize: '14px',
          lineHeight: '171.429%',
          letterSpacing: '0.42px',
        }}
        component="p"
        aria-hidden="true"
      >
        {descriptionText}
      </Typography>
      <div className="product-info__description-block">
        <Typography
          className={`product-info__description ${isExpanded ? 'product-info__description--expanded' : ''}`}
          sx={{
            fontSize: '14px',
            lineHeight: '171.429%',
            letterSpacing: '0.42px',
            color: 'var(--product-description-color)',
          }}
          component="p"
        >
          {descriptionText}
        </Typography>
        {showToggle && (
          <button
            type="button"
            className="product-info__description-link"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? 'less' : 'more...'}
          </button>
        )}
      </div>
      <div className="product-info__actions">
        <Button maxWidth="257px" height="56px" onClick={addToCart}>
          Add To Cart
        </Button>

        <Button maxWidth="257px" height="56px" onClick={buyNow}>
          Buy Now
        </Button>
      </div>
    </div>
  );
};
