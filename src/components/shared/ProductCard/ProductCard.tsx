import type { FC, MouseEvent, SyntheticEvent } from 'react';
import { Typography } from '@mui/material';

import { CartAdd, Like, Liked } from '@/assets';
import { useAppDispatch, useAppSelector, cartActions, wishListActions } from '@/core/store';
import { Button } from '@/components';
import { FALLBACK_IMAGE } from '@/core/constants';
import type { IProduct } from '@/core/types';

import './ProductCard.css';

interface IProps {
  product: IProduct;
  className?: string;
  likeClassName?: string;
  showBadge?: boolean;
  onClick?: () => void;
}

const formatProductPrice = (price: number) =>
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(price);

export const ProductCard: FC<IProps> = ({
  product,
  className = '',
  likeClassName = '',
  showBadge = true,
  onClick,
}) => {
  const dispatch = useAppDispatch();
  const wishList = useAppSelector((state) => state.wishList.wishList);
  const userId = useAppSelector((state) => state.auth.userId);
  const isLiked = wishList.some((item) => item.id === product.id);
  const productImage = product.img || FALLBACK_IMAGE;
  const badge = product.badge;
  const productCardClassName = `product-card ${className}`.trim();
  const likeIconClassName = `product-card__like ${isLiked ? 'is-active' : ''} ${likeClassName}`.trim();
  const FavoriteIcon = isLiked ? Liked : Like;

  const addToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(cartActions.addProduct(product.id));
  };

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  const handleLikeClick = (event: MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();

    if (!userId) {
      if (isLiked) {
        dispatch(wishListActions.removeProductFromWishList(product.id));
        return;
      }

      dispatch(wishListActions.addProductToWishList(product));
      return;
    }

    if (isLiked) {
      void dispatch(wishListActions.removeFavorite(product.id));
      return;
    }

    void dispatch(wishListActions.addFavorite(product));
  };

  return (
    <article className={productCardClassName} onClick={onClick}>
      <div className="product-card__media">
        {badge && showBadge && (
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
          sx={{
            marginTop: '16px',
            fontSize: '15px',
            fontWeight: 500,
            color: 'var(--black)',
          }}
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
        <FavoriteIcon className={likeIconClassName} onClick={handleLikeClick} />
      </div>
    </article>
  );
};
