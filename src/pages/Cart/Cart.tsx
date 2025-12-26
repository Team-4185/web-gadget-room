import { CartGrid } from '../../components/ui/Cart/CartGrid';
import { OrderSummary } from '../../components/ui/Cart/OrderSummary';

import { Container, Box } from '@mui/material';

export const Cart: React.FC = () => {
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
