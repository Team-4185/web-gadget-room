import type { FC } from 'react';
import { Container } from '@mui/material';
import { Navigate } from 'react-router';

import { selectCartTotalAmount, useAppSelector } from '@/core/store';
import { CartGrid, OrderSummary } from '@/components';

import './Cart.css';

export const Cart: FC = () => {
  const cartLength = useAppSelector(selectCartTotalAmount);

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
