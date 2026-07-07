import { type FC, type MouseEvent, type SyntheticEvent } from 'react';
import { Typography } from '@mui/material';

import { Liked } from '@/assets';
import { Button } from '@/components';
import { FALLBACK_IMAGE } from '@/core/constants';
import { cartActions, useAppDispatch, useAppSelector, wishListActions } from '@/core/store';
import {
  applySelectedProductVariant,
  formatStorageCapacity,
  getDefaultPhoneColor,
  getDefaultStorageCapacity,
} from '@/core/utils';
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
  const productWithSelectedVariant = applySelectedProductVariant(
    product,
    product.selectedColor?.name,
    product.selectedStorage?.name
  );
  const selectedColor =
    productWithSelectedVariant.selectedColor ?? getDefaultPhoneColor(product.colors);
  const selectedStorage =
    productWithSelectedVariant.selectedStorage ??
    getDefaultStorageCapacity(product.storageCapacity);

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
    dispatch(cartActions.addProduct(productWithSelectedVariant));
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
        <div className="user-favorite-product-card__color">
          <span className="user-favorite-product-card__color-label">Color:</span>
          <span className="user-favorite-product-card__color-value">
            <span
              className="user-favorite-product-card__color-swatch"
              style={{ backgroundColor: selectedColor.hexCode }}
              aria-hidden="true"
            />
            <span>{selectedColor.displayName}</span>
          </span>
        </div>
        <div className="user-favorite-product-card__storage">
          <span className="user-favorite-product-card__color-label">Storage:</span>
          <span>{formatStorageCapacity(selectedStorage)}</span>
        </div>
        <Typography
          className="user-favorite-product-card__price"
          component="p"
          sx={{ fontSize: '17px', fontWeight: 500, lineHeight: '22px', color: 'var(--black)' }}
        >
          $ {formatPrice(productWithSelectedVariant.price)}
        </Typography>
      </div>

      <Button
        maxWidth="100%"
        height="36px"
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
