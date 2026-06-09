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
  currentPassword: string;
}

interface UserPanelEmailSectionProps {
  value: EmailState;
  onChange: (key: keyof EmailState) => (event: ChangeEvent<HTMLInputElement>) => void;
  isSaving?: boolean;
  onSubmit: () => void;
}

export const UserPanelEmailSection: FC<UserPanelEmailSectionProps> = ({
  value,
  onChange,
  isSaving = false,
  onSubmit,
}) => {
  return (
    <UserPanelSettingsSection
      icon={<Mail width={30} height={30} />}
      title="E-mail"
      subtitle="Change email address"
      action={
        <UserPanelSettingsActionButton
          text={isSaving ? 'Saving...' : 'Change email'}
          maxWidth="192px"
          disabled={isSaving}
          onClick={onSubmit}
        />
      }
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
          onChange={onChange('next')}
          autoComplete="email"
        />

        <Input
          label="Current Password"
          placeholder="Current password"
          size="medium"
          value={value.currentPassword}
          isPassword
          onChange={onChange('currentPassword')}
          autoComplete="current-password"
        />

        <UserPanelSettingsInfoMessage
          title="Note:"
          text="After changing your email address, a confirmation email will be sent to your new address."
        />
      </div>
    </UserPanelSettingsSection>
  );
};
