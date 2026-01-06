import type { FC } from 'react';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import type { RootState } from '../../../core/store';
import { OrderingSteps } from './OrderingSteps/OrderingSteps';
import { Navigation } from './Navigation/Navigation';
import { BreadCrumbs } from '../../ui/BreadCrumbs/BreadCrumbs';

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
    <Container className="header" disableGutters maxWidth="xl" component={'header'}>
      <Navigation orderLength={cartLength} page={page} handleLogin={handleLogin} />
      <OrderingSteps page={page} />
      <BreadCrumbs page={page} product={productName} />
    </Container>
  );
};
