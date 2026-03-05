import type { FC } from 'react';
import { Container, Badge } from '@mui/material';
import { Link as RouterLink, NavLink, useLocation } from 'react-router-dom';

import { BreadCrumbs, OrderingSteps } from '@/components';
import { useAppSelector } from '@/core/store';
import {
  AUTHBUTTON,
  ICONS,
  PAGES,
  ROUTES_WITHOUT_BREADCRUMBS,
  ROUTES_WITH_ORDERING_STEPS,
} from '@/core/constants';
import { Cart } from '@/assets';

import Logo from '/logo.jpg';

import './Header.css';

export const Header: FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // const page = pageMap[currentPath];
  const cartLength = useAppSelector((state) => state.cart.cart.length);

  const user = false;
  const authPage = currentPath.startsWith('/login') || currentPath.startsWith('/register');

  const shouldShowBreadcrumbs = !ROUTES_WITHOUT_BREADCRUMBS.includes(currentPath);
  const shouldShowOrderingSteps = ROUTES_WITH_ORDERING_STEPS.includes(currentPath);

  return (
    <header className="header">
      <Container disableGutters>
        <div className="header__wrapper">
          <div className="header__left">
            <RouterLink to={'/'} className="header__logo">
              <img src={Logo} alt="Logo" />
            </RouterLink>

            {!authPage && (
              <div className="navigation">
                {PAGES.map((p) => (
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
              {ICONS.map((icon) => {
                const IconComponent = icon.icon;

                return (
                  <NavLink
                    key={icon.id}
                    to={icon.href}
                    className={({ isActive }) => `header__icon ${isActive ? 'active' : ''}`}
                  >
                    {IconComponent === Cart ? (
                      <Badge badgeContent={cartLength} color="primary">
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
              {AUTHBUTTON.map((authButton) => {
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
        </div>
        {shouldShowBreadcrumbs && <BreadCrumbs />}
        {shouldShowOrderingSteps && <OrderingSteps />}
      </Container>
    </header>
  );
};
