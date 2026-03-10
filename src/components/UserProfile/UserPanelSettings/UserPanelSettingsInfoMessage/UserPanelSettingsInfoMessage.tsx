import type { FC } from 'react';
import { Typography } from '@mui/material';

import './UserPanelSettingsInfoMessage.css';

interface UserPanelSettingsInfoMessageProps {
  title: string;
  text: string;
}

export const UserPanelSettingsInfoMessage: FC<UserPanelSettingsInfoMessageProps> = ({
  title,
  text,
}) => {
  return (
    <div className="user-profile__settings-note">
      <Typography component="p" sx={{ fontSize: '14px', color: 'var(--white)', lineHeight: 1 }}>
        <Typography component="span" sx={{ fontWeight: 600, color: 'inherit' }}>
          {title}
        </Typography>{' '}
        {text}
      </Typography>
    </div>
  );
};
