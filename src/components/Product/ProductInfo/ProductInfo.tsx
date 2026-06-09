import { useEffect, useRef, useState, type FC } from 'react';
import { useNavigate } from 'react-router';
import { Typography } from '@mui/material';

import { PRODUCT_SPECS_META } from '@/core/constants';
import { useAppDispatch, cartActions } from '@/core/store';
import type { ApiStorageCapacity, IProduct } from '@/core/types';
import { formatStorageCapacity } from '@/core/utils';
import { ProductTitlePrice, ProductSpecItem, Button } from '@/components';

import './ProductInfo.css';

interface ProductInfoProps {
  product: IProduct;
  specs: { label: string; value: string }[];
  description: string;
  loading: boolean;
  error: string | null;
  selectedStorage?: ApiStorageCapacity;
  onStorageSelect?: (storage: ApiStorageCapacity) => void;
}

export const ProductInfo: FC<ProductInfoProps> = ({
  product,
  specs,
  description,
  loading,
  error,
  selectedStorage,
  onStorageSelect,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const measureRef = useRef<HTMLParagraphElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const [hasExpandedOverflow, setHasExpandedOverflow] = useState(false);

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

      const lineCount = Math.ceil(element.scrollHeight / lineHeight);
      setShowToggle(lineCount > 3);
      setHasExpandedOverflow(lineCount > 10);
    };

    measureOverflow();
    window.addEventListener('resize', measureOverflow);

    return () => {
      window.removeEventListener('resize', measureOverflow);
    };
  }, [descriptionText]);

  const addToCart = async () => dispatch(cartActions.addProduct(product));

  const buyNow = async () => {
    await dispatch(cartActions.addProduct({ product, showConfirmation: false }));
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
          className={`product-info__description ${
            isExpanded ? 'product-info__description--expanded' : ''
          }`}
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
        {isExpanded && hasExpandedOverflow ? (
          <span className="product-info__description-ellipsis" aria-hidden="true">
            ...
          </span>
        ) : null}
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
      {product.storageCapacity?.length ? (
        <div className="product-info__storage" aria-label="Storage options">
          <Typography className="product-info__storage-label" component="span">
            Storage
          </Typography>
          <div className="product-info__storage-options">
            {product.storageCapacity.map((storage) => {
              const isSelected = selectedStorage?.name === storage.name;

              return (
                <button
                  key={storage.name}
                  type="button"
                  className={`product-info__storage-option ${
                    isSelected ? 'product-info__storage-option--selected' : ''
                  }`}
                  onClick={() => onStorageSelect?.(storage)}
                >
                  {formatStorageCapacity(storage)}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
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
