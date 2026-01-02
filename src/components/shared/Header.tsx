import type { FC } from 'react';
import { Container } from '@mui/material';

import { OrderingSteps } from '../ui/Header/OrderingSteps';
import { Navigation } from '../ui/Header/Navigation';
import { BreadCrumbs } from '../ui/Header/BreadCrumbs';

type HeaderProps = {
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
  orderLength?: number;
  product?: string;
  handleLogin?: () => void;
};

export const Header: FC<HeaderProps> = ({ page, orderLength, product, handleLogin }) => {
  return (
    <Container disableGutters maxWidth="xl" sx={{ padding: '28px 34px' }} component={'header'}>
      <Navigation orderLength={orderLength} page={page} handleLogin={handleLogin} />
      <OrderingSteps page={page} />
      <BreadCrumbs page={page} product={product} />
    </Container>
  );
};
