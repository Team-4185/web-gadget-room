import type { FC, ReactNode } from 'react';
import { Typography } from '@mui/material';

import './UserPanelSettingsSection.css';

interface UserPanelSettingsSectionProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const UserPanelSettingsSection: FC<UserPanelSettingsSectionProps> = ({
  icon,
  title,
  subtitle,
  action,
  children,
  className,
}) => {
  return (
    <div className={`user-profile__settings-card ${className || ''}`}>
      <div className="user-profile__settings-card-title">
        <span className="user-profile__settings-icon" aria-hidden>
          {icon}
        </span>
        <div className="user-profile__settings-title-wrap">
          <Typography component="h3" sx={{ fontSize: '24px', fontWeight: 700, lineHeight: 1 }}>
            {title}
          </Typography>
          {subtitle ? (
            <Typography component="p" sx={{ fontWeight: 500, lineHeight: 1 }}>
              {subtitle}
            </Typography>
          ) : null}
        </div>
      </div>

      {children}
      {action}
    </div>
  );
};
