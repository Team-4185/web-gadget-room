import type { FC } from 'react';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import type { RootState } from '../../core/store';
import { OrderingSteps } from '../ui/Header/OrderingSteps';
import { Navigation } from '../ui/Header/Navigation';
import { BreadCrumbs } from '../ui/Header/BreadCrumbs';

import './Header.css';

type HeaderProps = {
  handleLogin?: () => void;
};

export const Header: FC<HeaderProps> = ({ handleLogin }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const productName = location.state?.name;

  const pageMap: Record<string, any> = {
    '/cart': 'Cart',
    '/auth': location.state?.mode === 'register' ? 'Register' : 'Login',
    '/delivery': 'Delivery',
    '/payment': 'Payment',
    '/catalog': 'Catalog',
    '/product/:id': 'ProductPage',
    '/': 'Home',
  };

  const page = pageMap[currentPath];
  const cartLength = useSelector((state: RootState) => state.cart.cart.length);

  return (
    <Container
      className="header"
      disableGutters
      maxWidth="xl"
      sx={{ padding: '28px 34px' }}
      component={'header'}
    >
      <Navigation orderLength={cartLength} page={page} handleLogin={handleLogin} />
      <OrderingSteps page={page} />
      <BreadCrumbs page={page} product={productName} />
    </Container>
  );
};
