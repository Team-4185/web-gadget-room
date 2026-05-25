import type { FC } from 'react';
import { Container } from '@mui/material';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';

import type { RootState } from '@/core/store';
import { CartGrid, OrderSummary } from '@/components';

import './Cart.css';

export const Cart: FC = () => {
  const cartLength = useSelector((state: RootState) => state.cart.totalAmount);

  if (!cartLength) {
    return <Navigate to="/empty-cart" replace />;
  }

  return (
    <section className="cart">
      <Container disableGutters>
        <div className="cart__layout">
          <CartGrid />
          <OrderSummary continueTo="/delivery" shippingAmount={0} />
        </div>
      </Container>
    </section>
  );
};
