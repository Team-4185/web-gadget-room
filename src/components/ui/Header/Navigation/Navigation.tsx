import type { FC } from 'react';
import { Box, Typography, Badge } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

import Logo from '/icons/Logo.png';
import LogoText from '/icons/LogoText.svg';
import CartIcon from '/icons/cart.svg';
import SearchIcon from '/icons/search.svg';
import UserIcon from '/icons/user.svg';
import LikedIcon from '/icons/liked.svg';

import './Navigation.css';

type NavigationProps = {
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
  handleLogin?: () => void;
};

export const PageName = {
  Home: 'Home',
  Catalog: 'Catalog',
  AboutUs: 'About us',
  Cart: 'Cart',
  Delivery: 'Delivery',
  Payment: 'Payment',
  Login: 'Login',
  Register: 'Register',
  ProductPage: 'ProductPage',
} as const;

export const Navigation: FC<NavigationProps> = ({ page, orderLength, handleLogin }) => {
  const location = useLocation();

  const icons = [
    { id: 0, src: SearchIcon, href: '#' },
    { id: 1, src: UserIcon, href: '/auth' },
    { id: 2, src: LikedIcon, href: '#' },
    { id: 3, src: CartIcon, href: '/cart' },
  ];

  const pages = [
    { id: 0, name: PageName.Home, href: '/' },
    { id: 1, name: PageName.Catalog, href: '/catalog' },
    { id: 2, name: PageName.AboutUs, href: '/about' },
  ];

  const authPage = page === 'Login' || page === 'Register';

  const authButtons = [
    { id: 0, name: PageName.Login, href: '/auth' },
    { id: 1, name: PageName.Register, href: '/auth' },
  ];

  return (
    <Box component="nav" className="header_navigation">
      <Box className="header_navigation_left">
        <NavLink key={0} to={'/'} className="header_navigation_logo">
          <img src={Logo} alt="Logo" />
          <img src={LogoText} alt="GadgetRoom" />
        </NavLink>
        {!authPage && (
          <Box className="header_navigation_pages">
            {pages.map((p) => (
              <NavLink
                key={p.href}
                to={p.href}
                className={({ isActive }) => `navigation-page ${isActive ? 'active' : ''}`}
              >
                <Typography className="header_navigation_page__p">{p.name}</Typography>
              </NavLink>
            ))}
          </Box>
        )}
      </Box>

      {!authPage ? (
        <Box className="header_navigation_icons">
          {icons.map((icon) => (
            <NavLink
              key={icon.id}
              to={icon.href}
              className={({ isActive }) => `navigation-icon ${isActive ? 'active' : ''}`}
            >
              {icon.src === CartIcon ? (
                <Badge
                  badgeContent={orderLength && orderLength > 0 ? orderLength : 0}
                  color="primary"
                >
                  <img src={icon.src} alt="icon" />
                </Badge>
              ) : (
                <img src={icon.src} alt="icon" />
              )}
            </NavLink>
          ))}
        </Box>
      ) : (
        <Box className="header_navigation__auth">
          {authButtons.map((authButton) => {
            // fallback to 'login' if location.state?.mode is undefined
            const currentMode = location.state?.mode || 'login';
            const isActive =
              location.pathname === '/auth' && currentMode === authButton.name.toLowerCase();

            return (
              <NavLink
                key={authButton.id}
                to="/auth"
                state={{ mode: authButton.name.toLowerCase() }}
                className={`${isActive ? 'clicked' : ''}`}
                onClick={() => handleLogin && handleLogin()}
              >
                {authButton.name}
              </NavLink>
            );
          })}
        </Box>
      )}
    </Box>
  );
};
