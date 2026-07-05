import { type SyntheticEvent } from 'react';
import { Typography } from '@mui/material';

import {
  cartActions,
  selectCartLoading,
  selectCartProducts,
  useAppSelector,
  useAppDispatch,
} from '@/core/store';
import { Trash, Plus, Minus } from '@/assets';
import { FALLBACK_IMAGE } from '@/core/constants';
import {
  formatStorageCapacity,
  getDefaultPhoneColor,
  getDefaultStorageCapacity,
} from '@/core/utils';
import './ProductsCart.css';

export const ProductsCart = () => {
  const products = useAppSelector(selectCartProducts);
  const cartLoading = useAppSelector(selectCartLoading);
  const dispatch = useAppDispatch();

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <>
      {products.map((product, idx) => (
        <article
          key={`${product.id}-${product.selectedVariantId ?? 'phone'}`}
          className="cart-item"
        >
          {idx === 0 ? null : <div className="cart-item__divider" />}

          <div className="cart-item__main">
            <div className="cart-item__media">
              <img
                className="cart-item__image"
                src={product.img || FALLBACK_IMAGE}
                alt={product.name}
                loading="lazy"
                onError={handleImageError}
              />
            </div>

            <div className="cart-item__info">
              <Typography variant="body1" component="span" sx={{ fontWeight: 600, lineHeight: 1 }}>
                {product.name}
              </Typography>
              <span className="cart-item__color">
                <span className="cart-item__color-label">Color:</span>
                <span className="cart-item__color-value">
                  <span
                    className="cart-item__color-swatch"
                    style={{
                      backgroundColor: (
                        product.selectedColor ?? getDefaultPhoneColor(product.colors)
                      ).hexCode,
                    }}
                    aria-hidden="true"
                  />
                  <span>
                    {(product.selectedColor ?? getDefaultPhoneColor(product.colors)).displayName}
                  </span>
                </span>
              </span>
              <span className="cart-item__storage">
                Storage:{' '}
                {formatStorageCapacity(
                  product.selectedStorage ?? getDefaultStorageCapacity(product.storageCapacity)
                )}
              </span>
            </div>

            <div className="cart-item__amount">
              <button
                onClick={() => dispatch(cartActions.decreaseAmount(product))}
                className="cart-item__amount-btn"
                disabled={cartLoading || product.amount <= 1}
                aria-label="Decrease quantity"
              >
                <Minus width={12} height={12} />
              </button>
              <Typography
                variant="body1"
                component="span"
                sx={{
                  minWidth: '20px',
                  textAlign: 'center',
                  fontSize: '15px',
                  fontWeight: 500,
                  lineHeight: 1,
                }}
              >
                {product.amount}
              </Typography>
              <button
                onClick={() => dispatch(cartActions.increaseAmount(product))}
                className="cart-item__amount-btn"
                disabled={cartLoading}
                aria-label="Increase quantity"
              >
                <Plus width={12} height={12} />
              </button>
            </div>

            <Typography
              variant="body1"
              component="span"
              className="cart-item__subtotal"
              sx={{ fontSize: '15px', fontWeight: 500, lineHeight: 1 }}
            >
              $ {(product.price * product.amount).toFixed(2)}
            </Typography>
          </div>

          <div
            onClick={() => {
              if (cartLoading) return;
              dispatch(
                cartActions.removeProduct({
                  phoneId: product.id,
                  variantId: product.selectedVariantId,
                  amount: product.amount,
                })
              );
            }}
            className="cart-item__remove"
            aria-disabled={cartLoading}
          >
            <Trash width={18} height={18} />
            <Typography variant="body1" component="span" sx={{ fontSize: '15px', fontWeight: 500 }}>
              Delete
            </Typography>
          </div>

          {idx === products.length - 1 ? (
            <div className="cart-item__divider cart-item__divider--last" />
          ) : null}
        </article>
      ))}
    </>
  );
};
