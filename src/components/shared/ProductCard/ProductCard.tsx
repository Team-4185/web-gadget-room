import type { FC, MouseEvent, SyntheticEvent } from 'react';
import { Typography } from '@mui/material';

import { CartAdd, Like } from '@/assets';
import { useAppDispatch, cartActions } from '@/core/store';
import { Button } from '@/components';
import { FALLBACK_IMAGE } from '@/core/constants';
import type { IProduct } from '@/core/types';

import './ProductCard.css';

interface IProps {
  product: IProduct;
  variant?: 'catalog' | 'home';
  onClick?: () => void;
}

const formatProductPrice = (price: number) =>
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(price);

export const ProductCard: FC<IProps> = ({ product, variant = 'catalog', onClick }) => {
  const dispatch = useAppDispatch();
  const productImage = product.img || FALLBACK_IMAGE;
  const badge = product.badge;

  const addToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(cartActions.addProduct(product.id));
  };

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  const handleLikeClick = (event: MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
  };

  return (
    <article className={`product-card product-card--${variant}`} onClick={onClick}>
      <div className="product-card__media">
        {badge && (
          <span className={`product-card__badge product-card__badge--${badge.toLowerCase()}`}>
            {badge}
          </span>
        )}
        <img
          className="product-card__image"
          width={174}
          height={174}
          src={productImage}
          alt={product.name}
          loading="lazy"
          onError={handleImageError}
        />
      </div>

      <div className="product-card__info">
        <Typography
          className="product-card__title"
          component="h3"
          sx={{ fontSize: '16px', lineHeight: '20px', color: 'var(--black)' }}
        >
          {product.name}
        </Typography>
        <Typography
          className="product-card__price"
          component="p"
          sx={{ marginTop: '16px', fontSize: 15, fontWeight: 500, color: 'var(--black)' }}
        >
          ${formatProductPrice(product.price)}
        </Typography>
      </div>

      <div className="product-card__actions">
        <Button
          maxWidth="188px"
          height="36px"
          fontSize="15px"
          fontWeight={500}
          endIcon={<CartAdd />}
          onClick={addToCart}
        >
          Add to Cart
        </Button>
        <Like className="product-card__like" onClick={handleLikeClick} />
      </div>
    </article>
  );
};
