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
        <Container disableGutters maxWidth="xl" className="steps">
          <Box className="steps__box cart_page">
            <span className="step__number step__active">1</span>
            <span className="step__text">{page}</span>
            <span className="step__number step__inactive">2</span>
            <span className="step__number step__inactive">3</span>
          </Box>
        </Container>
      )}

      {shippingPage && (
        <Container disableGutters maxWidth="xl" className="steps">
          <Box className="steps__box shipping__Page">
            <img src={CheckMark} className="step__number step__inactive" />
            <span className="step__number step__active">2</span>
            <span className="step__text">{page}</span>
            <span className="step__number step__inactive">3</span>
          </Box>
        </Container>
      )}

      {paymentPage && (
        <Container disableGutters maxWidth="xl" className="steps">
          <Box className="steps__box payment__Page">
            <img src={CheckMark} className="step__number step__inactive" />
            <img src={CheckMark} className="step__number step__inactive" />
            <span className="step__number step__active">3</span>
            <span className="step__text">{page}</span>
          </Box>
        </Container>
      )}
    </>
  );
};
