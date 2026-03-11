import type { ChangeEvent, FC } from 'react';
import { Typography } from '@mui/material';

import { Mail } from '@/assets';
import {
  Input,
  UserPanelSettingsActionButton,
  UserPanelSettingsInfoMessage,
  UserPanelSettingsSection,
} from '@/components';

import './UserPanelEmailSection.css';

interface EmailState {
  current: string;
  next: string;
}

interface UserPanelEmailSectionProps {
  value: EmailState;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const UserPanelEmailSection: FC<UserPanelEmailSectionProps> = ({ value, onChange }) => {
  return (
    <UserPanelSettingsSection
      icon={<Mail width={30} height={30} />}
      title="E-mail"
      subtitle="Change email address"
      action={<UserPanelSettingsActionButton text="Change email" maxWidth="192px" />}
    >
      <div className="user-profile__settings-content">
        <div className="user-profile__settings-text-input">
          <Typography component="p" sx={{ fontSize: '11px', fontWeight: 500, lineHeight: 1 }}>
            Current email address
          </Typography>
          <Typography component="p" sx={{ fontSize: '14px', fontWeight: 600, lineHeight: 1 }}>
            {value.current}
          </Typography>
        </div>

        <Input
          label="New Email Address"
          placeholder="New email address"
          size="medium"
          value={value.next}
          onChange={onChange}
        />

        <UserPanelSettingsInfoMessage
          title="Note:"
          text="After changing your email address, a confirmation email will be sent to your new address."
        />
      </div>
    </UserPanelSettingsSection>
  );
};
