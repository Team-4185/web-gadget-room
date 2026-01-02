import type { FC } from 'react';
import { Container, Box } from '@mui/material';

import { CartGrid } from '../../components/shared/Cart/CartGrid';
import { OrderSummary } from '../../components/shared/Cart/OrderSummary';

export const Cart: FC = () => {
  return (
    <>
      <Container disableGutters maxWidth="xl" className="cart-container">
        <Box className="cart-content">
          {/* Left Side */}
          <CartGrid />
          {/* Правая часть */}
          <OrderSummary />
        </Box>
      </Container>
    </>
  );
};
