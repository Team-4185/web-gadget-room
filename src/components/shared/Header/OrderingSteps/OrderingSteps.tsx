import type { FC } from 'react';
import { Container, Box } from '@mui/material';

import CheckMark from '/icons/checkMark.svg';

import './OrderingSteps.css';

type OrderingStepsProps = {
  page?:
    | 'Home'
    | 'Catalog'
    | 'About us'
    | 'Login'
    | 'Register'
    | 'Cart'
    | 'Delivery'
    | 'Payment'
    | 'ProductPage';
};

export const OrderingSteps: FC<OrderingStepsProps> = ({ page }) => {
  const cartPage = page === 'Cart';
  const shippingPage = page === 'Delivery';
  const paymentPage = page === 'Payment';

  return (
    <>
      {cartPage && (
        <Container disableGutters maxWidth="xl" className="ordering_steps__container">
          <Box className="ordering_steps__box cart_page">
            <span className="step-number step-active">1</span>
            <span className="step-text">{page}</span>
            <span className="step-number step-inactive">2</span>
            <span className="step-number step-inactive">3</span>
          </Box>
        </Container>
      )}

      {shippingPage && (
        <Container disableGutters maxWidth="xl" className="ordering_steps__container">
          <Box className="ordering_steps__box shipping_Page">
            <img src={CheckMark} className="step-number step-inactive" />
            <span className="step-number step-active">2</span>
            <span className="step-text">{page}</span>
            <span className="step-number step-inactive">3</span>
          </Box>
        </Container>
      )}

      {paymentPage && (
        <Container disableGutters maxWidth="xl" className="ordering_steps__container">
          <Box className="ordering_steps__box payment_Page">
            <img src={CheckMark} className="step-number step-inactive" />
            <img src={CheckMark} className="step-number step-inactive" />
            <span className="step-number step-active">3</span>
            <span className="step-text">{page}</span>
          </Box>
        </Container>
      )}
    </>
  );
};
