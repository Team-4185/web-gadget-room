import type { FC } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import type { IAdminPanelMenuItem } from '@/core/types';

import './AdminPanelSidebar.css';

interface IProps {
  menu: IAdminPanelMenuItem[];
  activeItem?: string;
}

const MENU_ROUTE_MAP: Record<string, string> = {
  dashboard: '/adminPanel',
  product: '/adminPanel/products',
  orders: '/adminPanel/orders',
  customers: '/adminPanel/customers',
};

export const AdminPanelSidebar: FC<IProps> = ({ menu, activeItem = 'dashboard' }) => {
  const navigate = useNavigate();

  return (
    <aside className="admin-panel-sidebar">
      <Typography component="h2" className="admin-panel-sidebar__logo">
        GADGETROOM
      </Typography>

      <nav className="admin-panel-sidebar__menu" aria-label="Admin sections">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              type="button"
              className={`admin-panel-sidebar__item ${isActive ? 'is-active' : ''}`}
              onClick={() => {
                const targetRoute = MENU_ROUTE_MAP[item.id];
                if (targetRoute) {
                  navigate(targetRoute);
                }
              }}
            >
              <span className="admin-panel-sidebar__item-content">
                <Icon sx={{ fontSize: '24px' }} />
                <Typography component="span" sx={{ fontSize: '20px', fontWeight: 600 }}>
                  {item.label}
                </Typography>
              </span>

              {item.badge ? (
                <span className="admin-panel-sidebar__badge">
                  <Typography component="span" sx={{ fontSize: '10px', color: 'inherit' }}>
                    {item.badge}
                  </Typography>
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
