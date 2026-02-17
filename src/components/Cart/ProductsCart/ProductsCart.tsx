import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';

import type { RootState } from '@/core/store';
import { decreaseAmount, increaseAmount, removeProduct } from '@/core/store/slices/cartSlice';
import { Trash, Plus, Minus } from '@/assets';

import greyBox from '/icons/greyBox.png';

import './ProductsCart.css';

export const ProductsCart = () => {
  const products = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();

  return (
    <>
      {products.map((product, idx) => (
        <article key={product.id} className="cart-item">
          {idx === 0 ? null : <div className="cart-item__divider" />}

          <div className="cart-item__main">
            <div className="cart-item__media">
              <img className="cart-item__image" src={greyBox} alt={product.name} />
            </div>

            <div className="cart-item__info">
              <Typography variant="body1" component="span" sx={{ fontWeight: 600, lineHeight: 1 }}>
                {product.name}
              </Typography>
              <Typography
                variant="body1"
                component="span"
                sx={{ fontSize: '14px', opacity: 0.7, lineHeight: 1.2 }}
              >
                Color: Black
              </Typography>
            </div>

            <div className="cart-item__amount">
              <button
                onClick={() => dispatch(decreaseAmount(product.id))}
                className="cart-item__amount-btn"
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
                onClick={() => dispatch(increaseAmount(product.id))}
                className="cart-item__amount-btn"
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
              {'\u20AC'} {product.price * product.amount}
            </Typography>
          </div>

          <div onClick={() => dispatch(removeProduct(product.id))} className="cart-item__remove">
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
