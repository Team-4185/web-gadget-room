import type { FC } from 'react';
import { Typography } from '@mui/material';

import type { AdminPanelTab, IAdminPanelMenuItem } from '@/core/types';

import './AdminPanelSidebar.css';

interface IProps {
  menu: IAdminPanelMenuItem[];
  activeItem?: AdminPanelTab;
  onTabChange?: (tab: AdminPanelTab) => void;
}

export const AdminPanelSidebar: FC<IProps> = ({ menu, activeItem = 'dashboard', onTabChange }) => {
  return (
    <aside className="admin-panel-sidebar">
      <nav className="admin-panel-sidebar__menu" aria-label="Admin sections">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              type="button"
              className={`admin-panel-sidebar__item ${isActive ? 'is-active' : ''}`}
              onClick={() => onTabChange?.(item.id)}
            >
              <span className="admin-panel-sidebar__item-content">
                <Icon width={24} height={24} style={{ color: 'var(--blue-violet)' }} />
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
