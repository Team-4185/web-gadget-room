import { useEffect, type SyntheticEvent } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router';

import { Check, Plus } from '@/assets';
import { FALLBACK_IMAGE } from '@/core/constants';
import { cartActions, useAppDispatch, useAppSelector } from '@/core/store';
import { getDefaultPhoneColor } from '@/core/utils';
import { Button } from '@/components/ui';

import './AddToCartModal.css';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

export const AddToCartModal = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.cart.lastAddedProduct);
  const selectedColor = product
    ? product.selectedColor ?? getDefaultPhoneColor(product.colors)
    : null;

  const closeModal = () => {
    dispatch(cartActions.closeAddToCartModal());
  };

  const goToCart = () => {
    closeModal();
    navigate('/cart');
  };

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  useEffect(() => {
    if (!product) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [product]);

  if (!product) return null;

  return (
    <div className="add-to-cart-modal__backdrop" role="presentation">
      <section
        className="add-to-cart-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-to-cart-modal-title"
      >
        <header className="add-to-cart-modal__header">
          <div className="add-to-cart-modal__title-row">
            <span className="add-to-cart-modal__success" aria-hidden="true">
              <Check />
            </span>
            <Typography
              id="add-to-cart-modal-title"
              component="h3"
              sx={{ fontSize: '20px', fontWeight: 600, lineHeight: '24px', color: 'var(--black)' }}
            >
              Added to cart!
            </Typography>
          </div>
          <button
            className="add-to-cart-modal__close"
            type="button"
            aria-label="Close add to cart modal"
            onClick={closeModal}
          >
            <Plus />
          </button>
        </header>

        <div className="add-to-cart-modal__product">
          <div className="add-to-cart-modal__image-wrap">
            <img
              className="add-to-cart-modal__image"
              src={product.img || FALLBACK_IMAGE}
              alt={product.name}
              onError={handleImageError}
            />
          </div>
          <div className="add-to-cart-modal__details">
            <Typography
              className="add-to-cart-modal__name"
              component="p"
              sx={{ fontSize: '16px', fontWeight: 600, lineHeight: '20px', color: 'var(--black)' }}
            >
              {product.name}
            </Typography>
            <Typography
              className="add-to-cart-modal__price"
              component="p"
              sx={{ fontSize: '15px', fontWeight: 500, lineHeight: '18px', color: 'var(--black)' }}
            >
              ${formatPrice(product.price)}
            </Typography>
            {selectedColor ? (
              <div className="add-to-cart-modal__color">
                <span className="add-to-cart-modal__color-label">Color:</span>
                <span
                  className="add-to-cart-modal__color-swatch"
                  style={{ backgroundColor: selectedColor.hexCode }}
                  aria-hidden="true"
                />
                <span>{selectedColor.displayName}</span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="add-to-cart-modal__actions">
          <Button
            type="button"
            maxWidth="100%"
            height="36px"
            fontSize="16px"
            fontWeight={400}
            borderRadius="12px"
            onClick={closeModal}
          >
            Continue shopping
          </Button>
          <Button
            type="button"
            maxWidth="100%"
            height="36px"
            fontSize="16px"
            fontWeight={400}
            borderRadius="12px"
            onClick={goToCart}
          >
            Go to cart
          </Button>
        </div>
      </section>
    </div>
  );
};
