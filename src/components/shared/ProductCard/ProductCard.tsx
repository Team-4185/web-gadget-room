import { useMemo, useState, type FC, type MouseEvent, type SyntheticEvent } from 'react';
import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

import { CartAdd, ChevronDown, Like, Liked } from '@/assets';
import { useAppDispatch, useAppSelector, cartActions, wishListActions } from '@/core/store';
import { Button } from '@/components';
import { FALLBACK_IMAGE } from '@/core/constants';
import { DEFAULT_PHONE_COLOR, getDefaultPhoneColor } from '@/core/utils';
import type { ApiPhoneColor, IProduct } from '@/core/types';

import './ProductCard.css';

interface IProps {
  product: IProduct;
  className?: string;
  likeClassName?: string;
  showBadge?: boolean;
  forceLiked?: boolean;
  onClick?: () => void;
}

const formatProductPrice = (price: number) =>
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(price);

const getCardColorOptions = (product: IProduct): ApiPhoneColor[] => {
  const colors = product.colors?.length ? product.colors : [DEFAULT_PHONE_COLOR];
  const hasBlack = colors.some((color) => color.name === DEFAULT_PHONE_COLOR.name);

  return hasBlack ? colors : [DEFAULT_PHONE_COLOR, ...colors];
};

export const ProductCard: FC<IProps> = ({
  product,
  className = '',
  likeClassName = '',
  showBadge = true,
  forceLiked = false,
  onClick,
}) => {
  const dispatch = useAppDispatch();
  const wishList = useAppSelector((state) => state.wishList.wishList);
  const userId = useAppSelector((state) => state.auth.userId);
  const isLiked = forceLiked || wishList.some((item) => item.id === product.id);
  const productImage = product.img || FALLBACK_IMAGE;
  const badge = product.badge;
  const badgeText =
    badge === 'Sale' && product.discountPercent ? `-${product.discountPercent}%` : badge;
  const colorOptions = useMemo(() => getCardColorOptions(product), [product]);
  const [selectedColorName, setSelectedColorName] = useState(
    () => product.selectedColor?.name ?? getDefaultPhoneColor(product.colors).name
  );
  const selectedColor =
    colorOptions.find((color) => color.name === selectedColorName) ??
    getDefaultPhoneColor(product.colors);
  const productWithSelectedColor = {
    ...product,
    selectedColor,
  };
  const productCardClassName = `product-card ${className}`.trim();
  const likeIconClassName =
    `product-card__like ${isLiked ? 'is-active' : ''} ${likeClassName}`.trim();
  const FavoriteIcon = isLiked ? Liked : Like;

  const addToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(cartActions.addProduct(productWithSelectedColor));
  };

  const handleColorChange = (event: SelectChangeEvent<string>) => {
    setSelectedColorName(event.target.value);
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
            {badgeText}
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
        <div className="product-card__color" onClick={(event) => event.stopPropagation()}>
          <span className="product-card__color-label">Color:</span>
          <FormControl className="product-card__color-control" size="small">
            <Select
              className="product-card__color-select"
              data-style-variant="subtleBorder"
              value={selectedColor.name}
              onChange={handleColorChange}
              IconComponent={ChevronDown}
              renderValue={(value) => {
                const color = colorOptions.find((item) => item.name === value) ?? selectedColor;

                return (
                  <span className="product-card__color-value">
                    <span
                      className="product-card__color-swatch"
                      style={{ backgroundColor: color.hexCode }}
                      aria-hidden="true"
                    />
                    <span>{color.displayName}</span>
                  </span>
                );
              }}
              MenuProps={{
                PaperProps: {
                  className: 'product-card__color-menu',
                },
              }}
            >
              {colorOptions.map((color) => (
                <MenuItem
                  key={color.name}
                  value={color.name}
                  className="product-card__color-option"
                >
                  <span
                    className="product-card__color-swatch"
                    style={{ backgroundColor: color.hexCode }}
                    aria-hidden="true"
                  />
                  <span>{color.displayName}</span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Typography
          className="product-card__price"
          component="p"
          sx={{
            fontSize: '15px',
            fontWeight: 500,
            color: 'var(--black)',
            marginTop: '9px',
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
