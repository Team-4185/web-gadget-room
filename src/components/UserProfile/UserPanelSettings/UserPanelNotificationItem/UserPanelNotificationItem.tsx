import type { FC } from 'react';
import { Typography } from '@mui/material';

import { CheckBox } from '@/components';

import './UserPanelNotificationItem.css';

interface UserPanelNotificationItemProps {
  id: string;
  name: string;
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}

export const UserPanelNotificationItem: FC<UserPanelNotificationItemProps> = ({
  id,
  name,
  title,
  description,
  checked,
  onChange,
}) => {
  return (
    <div className="user-profile__settings-notification-row">
      <div className="user-profile__settings-notification-copy">
        <Typography component="h4" sx={{ fontSize: '20px', fontWeight: 600, lineHeight: 1 }}>
          {title}
        </Typography>
        <Typography component="p" sx={{ fontWeight: 500, lineHeight: 1 }}>
          {description}
        </Typography>
      </div>
      <CheckBox
        className="user-profile__settings-checkbox"
        id={id}
        name={name}
        label=""
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};
