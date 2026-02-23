import type { FC } from 'react';
import { Container } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import type { RootState } from '@/core/store';
import { CartGrid, OrderSummary } from '@/components';

import './Cart.css';

export const Cart: FC = () => {
  const cartLength = useSelector((state: RootState) => state.cart.cart.length);

  if (!cartLength) {
    return <Navigate to="/empty-cart" replace />;
  }

  return (
    <section className="cart">
      <Container disableGutters>
        <div className="cart__layout">
          <CartGrid />
          <OrderSummary continueTo="/delivery" />
        </div>
      </Container>
    </section>
  );
};
