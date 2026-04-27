import type { FC } from 'react';
import { Typography } from '@mui/material';

import { User } from '@/assets';
import type { IUserPanelMenuItem, UserPanelTab } from '@/core/types';
import { USER_PANEL_LOGOUT } from '@/core/constants';

import './UserPanelSidebar.css';

interface IProps {
  fullName: string;
  email: string;
  menu: IUserPanelMenuItem[];
  activeTab: UserPanelTab;
  onTabChange: (tab: UserPanelTab) => void;
  onLogout: () => void;
}

export const UserPanelSidebar: FC<IProps> = ({
  fullName,
  email,
  menu,
  activeTab,
  onTabChange,
  onLogout,
}) => {
  const LogoutIcon = USER_PANEL_LOGOUT.icon;

  return (
    <aside className="user-panel-sidebar">
      <div className="user-panel-sidebar__profile">
        <div className="user-panel-sidebar__avatar" aria-hidden>
          <User width={70} height={70} />
        </div>
        <Typography component="h2" sx={{ margin: '10px 0 4px', fontSize: '14px', fontWeight: 600 }}>
          {fullName}
        </Typography>
        <Typography component="p" sx={{ fontSize: '14px', fontWeight: 300 }}>
          {email}
        </Typography>
      </div>

      <nav className="user-panel-sidebar__menu" aria-label="User panel sections">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeTab;

          return (
            <button
              key={item.id}
              type="button"
              className={`user-panel-sidebar__item ${isActive ? 'is-active' : ''}`}
              onClick={() => onTabChange(item.id)}
            >
              <span className="user-panel-sidebar__item-label">
                <Icon width={30} height={30} style={{ color: 'var(--blue-violet)' }} />
                <Typography component="span" sx={{ fontSize: '20px', fontWeight: 600 }}>
                  {item.label}
                </Typography>
              </span>

              {item.badge ? (
                <span className="user-panel-sidebar__badge">
                  <Typography
                    component="span"
                    sx={{ fontSize: '14px', color: 'inherit', fontWeight: 600 }}
                  >
                    {item.badge}
                  </Typography>
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      <button type="button" className="user-panel-sidebar__logout" onClick={onLogout}>
        <LogoutIcon width={30} height={30} />
        <Typography component="span" variant="h6" sx={{ fontSize: '20px', fontWeight: 600 }}>
          {USER_PANEL_LOGOUT.label}
        </Typography>
      </button>
    </aside>
  );
};
