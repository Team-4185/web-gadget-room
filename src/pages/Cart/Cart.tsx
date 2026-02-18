import type { FC } from 'react';
import { Container } from '@mui/material';

import { CartGrid, OrderSummary } from '@/components';

import './Cart.css';

export const Cart: FC = () => {
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
