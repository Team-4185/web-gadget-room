import { useMemo, type SyntheticEvent } from 'react';
import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

import { cartActions, useAppSelector, useAppDispatch } from '@/core/store';
import { Trash, Plus, Minus, ChevronDown } from '@/assets';
import { FALLBACK_IMAGE } from '@/core/constants';
import { DEFAULT_PHONE_COLOR, getDefaultPhoneColor } from '@/core/utils';
import type { ApiPhoneColor, IProduct } from '@/core/types';

import './ProductsCart.css';

const getCartColorOptions = (product: IProduct): ApiPhoneColor[] => {
  const colors = product.colors?.length ? product.colors : [DEFAULT_PHONE_COLOR];
  const hasBlack = colors.some((color) => color.name === DEFAULT_PHONE_COLOR.name);

  return hasBlack ? colors : [DEFAULT_PHONE_COLOR, ...colors];
};

export const ProductsCart = () => {
  const products = useAppSelector((state) => state.cart.cart);
  const cartLoading = useAppSelector((state) => state.cart.loading);
  const dispatch = useAppDispatch();

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <>
      {products.map((product, idx) => (
        <article key={product.id} className="cart-item">
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
              <CartColorSelect product={product} disabled={cartLoading} />
            </div>

            <div className="cart-item__amount">
              <button
                onClick={() => dispatch(cartActions.decreaseAmount(product.id))}
                className="cart-item__amount-btn"
                disabled={cartLoading}
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
                onClick={() => dispatch(cartActions.increaseAmount(product.id))}
                className="cart-item__amount-btn"
                disabled={cartLoading}
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
              dispatch(cartActions.removeProduct({ phoneId: product.id, amount: product.amount }));
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

const CartColorSelect = ({ product, disabled }: { product: IProduct; disabled: boolean }) => {
  const dispatch = useAppDispatch();
  const colorOptions = useMemo(() => getCartColorOptions(product), [product]);
  const selectedColor = product.selectedColor ?? getDefaultPhoneColor(product.colors);
  const handleColorChange = (event: SelectChangeEvent<string>) => {
    dispatch(
      cartActions.updateProductColor({
        phoneId: product.id,
        colorName: event.target.value,
      })
    );
  };

  return (
    <label className="cart-item__color">
      <span className="cart-item__color-label">Color:</span>
      <FormControl className="cart-item__color-control" size="small">
        <Select
          className="cart-item__color-select"
          data-style-variant="subtleBorder"
          value={selectedColor.name}
          disabled={disabled}
          onChange={handleColorChange}
          IconComponent={ChevronDown}
          renderValue={(value) => {
            const color = colorOptions.find((item) => item.name === value) ?? selectedColor;

            return (
              <span className="cart-item__color-value">
                <span
                  className="cart-item__color-swatch"
                  style={{ backgroundColor: color.hexCode }}
                  aria-hidden="true"
                />
                <span>{color.displayName}</span>
              </span>
            );
          }}
          MenuProps={{
            PaperProps: {
              className: 'cart-item__color-menu',
            },
          }}
        >
          {colorOptions.map((color) => (
            <MenuItem key={color.name} value={color.name} className="cart-item__color-option">
              <span
                className="cart-item__color-swatch"
                style={{ backgroundColor: color.hexCode }}
                aria-hidden="true"
              />
              <span>{color.displayName}</span>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </label>
  );
};
