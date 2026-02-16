import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

import { ProductsCart } from '@/components';
import type { RootState } from '@/core/store';

import './CartGrid.css';

const titleSx = { fontWeight: 600, lineHeight: 1 };
const headerTextSx = { fontWeight: 600, lineHeight: 1 };
const headerSubtotalSx = { ...headerTextSx, textAlign: 'right' as const };

export const CartGrid = () => {
  const cartLength = useSelector((state: RootState) => state.cart.cart.length);

  return (
    <div className="cart__grid">
      <Typography variant="h6" component="h2" sx={titleSx}>
        Cart {cartLength ? `(${cartLength})` : null}
      </Typography>
      <div className="cart__header">
        <Typography
          variant="body1"
          component="span"
          sx={headerTextSx}
          className="cart__header-product"
        >
          Product
        </Typography>
        <Typography
          variant="body1"
          component="span"
          sx={headerTextSx}
          className="cart__header-amount"
        >
          Amount
        </Typography>
        <Typography
          variant="body1"
          component="span"
          sx={headerSubtotalSx}
          className="cart__header-subtotal"
        >
          Subtotal
        </Typography>
      </div>
      <div className="cart__divider" />
      <div className="cart__items">
        <ProductsCart />
      </div>
    </div>
  );
};
