import type { FC } from 'react';
import { Container, Badge } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';

import type { RootState } from '@/core/store';
import { BreadCrumbs, OrderingSteps } from '@/components';
import { authButtons, icons, pages } from '@/core/constants';
import { Cart } from '@/assets';

import Logo from '/icons/logo.jpg';

import './Header.css';

export const Header: FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // const page = pageMap[currentPath];
  const cartLength = useSelector((state: RootState) => state.cart.cart.length);

  const user = false;
  const authPage = currentPath.startsWith('/login') || currentPath.startsWith('/register');

  return (
    <header className="header">
      <Container disableGutters>
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={'/'} className="header__logo">
              <img src={Logo} alt="Logo" />
            </Link>

            {!authPage && (
              <div className="navigation">
                {pages.map((p) => (
                  <NavLink
                    key={p.href}
                    to={p.href}
                    className={({ isActive }) => `navigation__item ${isActive ? 'active' : ''}`}
                  >
                    {p.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {user ? (
            <div className="header__icons">
              {icons.map((icon) => {
                const IconComponent = icon.icon;

                return (
                  <NavLink
                    key={icon.id}
                    to={icon.href}
                    className={({ isActive }) => `header__icon ${isActive ? 'active' : ''}`}
                  >
                    {IconComponent === Cart ? (
                      <Badge badgeContent={cartLength > 0 ? cartLength : 0} color="primary">
                        <IconComponent width={32} height={32} />
                      </Badge>
                    ) : (
                      <IconComponent width={32} height={32} />
                    )}
                  </NavLink>
                );
              })}
            </div>
          ) : (
            <div className="header__auth">
              {authButtons.map((authButton) => {
                return (
                  <NavLink
                    key={authButton.id}
                    to={authButton.href}
                    className={({ isActive }) => `header__auth-button ${isActive ? 'active' : ''}`}
                  >
                    {authButton.name}
                  </NavLink>
                );
              })}
            </div>
          )}

          {/* <OrderingSteps page={page} /> */}
          {/* <BreadCrumbs page={page} product={productName} /> */}
        </div>
      </Container>
    </header>
  );
};
