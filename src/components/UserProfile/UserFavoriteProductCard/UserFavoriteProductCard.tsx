import { useMemo, useState, type FC, type MouseEvent, type SyntheticEvent } from 'react';
import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

import { ChevronDown, Liked } from '@/assets';
import { Button } from '@/components';
import { FALLBACK_IMAGE } from '@/core/constants';
import { cartActions, useAppDispatch, useAppSelector, wishListActions } from '@/core/store';
import { DEFAULT_PHONE_COLOR, getDefaultPhoneColor } from '@/core/utils';
import type { ApiPhoneColor, IProduct } from '@/core/types';

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

const getFavoriteColorOptions = (product: IProduct): ApiPhoneColor[] => {
  const colors = product.colors?.length ? product.colors : [DEFAULT_PHONE_COLOR];
  const hasBlack = colors.some((color) => color.name === DEFAULT_PHONE_COLOR.name);

  return hasBlack ? colors : [DEFAULT_PHONE_COLOR, ...colors];
};

export const UserFavoriteProductCard: FC<IProps> = ({ product, onClick }) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.userId);
  const colorOptions = useMemo(() => getFavoriteColorOptions(product), [product]);
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
    dispatch(cartActions.addProduct(productWithSelectedColor));
  };

  const handleColorChange = (event: SelectChangeEvent<string>) => {
    setSelectedColorName(event.target.value);
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
        <div
          className="user-favorite-product-card__color"
          onClick={(event) => event.stopPropagation()}
        >
          <span className="user-favorite-product-card__color-label">Color:</span>
          <FormControl className="user-favorite-product-card__color-control" size="small">
            <Select
              className="user-favorite-product-card__color-select"
              data-style-variant="subtleBorder"
              value={selectedColor.name}
              onChange={handleColorChange}
              IconComponent={ChevronDown}
              renderValue={(value) => {
                const color = colorOptions.find((item) => item.name === value) ?? selectedColor;

                return (
                  <span className="user-favorite-product-card__color-value">
                    <span
                      className="user-favorite-product-card__color-swatch"
                      style={{ backgroundColor: color.hexCode }}
                      aria-hidden="true"
                    />
                    <span>{color.displayName}</span>
                  </span>
                );
              }}
              MenuProps={{
                PaperProps: {
                  className: 'user-favorite-product-card__color-menu',
                },
              }}
            >
              {colorOptions.map((color) => (
                <MenuItem
                  key={color.name}
                  value={color.name}
                  className="user-favorite-product-card__color-option"
                >
                  <span
                    className="user-favorite-product-card__color-swatch"
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
          className="user-favorite-product-card__price"
          component="p"
          sx={{ fontSize: '17px', fontWeight: 500, lineHeight: '22px', color: 'var(--black)' }}
        >
          $ {formatPrice(product.price)}
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
