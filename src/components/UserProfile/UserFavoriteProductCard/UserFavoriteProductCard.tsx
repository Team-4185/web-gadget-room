import type { FC, MouseEvent, SyntheticEvent } from 'react';
import { Typography } from '@mui/material';

import { Liked } from '@/assets';
import { Button } from '@/components';
import { FALLBACK_IMAGE } from '@/core/constants';
import { cartActions, useAppDispatch, useAppSelector, wishListActions } from '@/core/store';
import type { IProduct } from '@/core/types';

import './UserFavoriteProductCard.css';

interface IProps {
  product: IProduct;
  onClick: () => void;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(price);

export const UserFavoriteProductCard: FC<IProps> = ({ product, onClick }) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.userId);

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  const handleFavoriteClick = (event: MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();

    if (userId) {
      void dispatch(wishListActions.removeFavorite(product.id));
      return;
    }

    dispatch(wishListActions.removeProductFromWishList(product.id));
  };

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(cartActions.addProduct(product.id));
  };

  return (
    <article className="user-favorite-product-card" onClick={onClick}>
      <div className="user-favorite-product-card__top">
        <img
          className="user-favorite-product-card__image"
          src={product.img || FALLBACK_IMAGE}
          alt={product.name}
          loading="lazy"
          onError={handleImageError}
        />
        <Liked className="user-favorite-product-card__like" onClick={handleFavoriteClick} />
      </div>

      <div className="user-favorite-product-card__body">
        <Typography
          className="user-favorite-product-card__title"
          component="h3"
          sx={{ fontSize: '18px', fontWeight: 600, lineHeight: '22px', color: 'var(--black)' }}
        >
          {product.name}
        </Typography>
        <Typography
          className="user-favorite-product-card__price"
          component="p"
          sx={{ fontSize: '17px', fontWeight: 500, lineHeight: '22px', color: 'var(--black)' }}
        >
          $ {formatPrice(product.price)}
        </Typography>
      </div>

      <Button
        maxWidth="100%"
        height="31px"
        fontSize="15px"
        fontWeight={600}
        textTransform="uppercase"
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>
    </article>
  );
};
