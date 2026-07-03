import type { ChangeEvent, FC } from 'react';

import { Settings } from '@/assets';
import {
  Input,
  UserPanelSettingsActionButton,
  UserPanelSettingsInfoMessage,
  UserPanelSettingsSection,
} from '@/components';

import './UserPanelPasswordSection.css';

interface PasswordState {
  current: string;
  next: string;
  confirm: string;
}

interface UserPanelPasswordSectionProps {
  value: PasswordState;
  onChange: (key: keyof PasswordState) => (event: ChangeEvent<HTMLInputElement>) => void;
  isSaving?: boolean;
  onSubmit: () => void;
}

export const UserPanelPasswordSection: FC<UserPanelPasswordSectionProps> = ({
  value,
  onChange,
  isSaving = false,
  onSubmit,
}) => {
  return (
    <UserPanelSettingsSection
      icon={<Settings width={30} height={30} />}
      title="Change password"
      subtitle="Update your password for security"
      action={
        <UserPanelSettingsActionButton
          text={isSaving ? 'Saving...' : 'Change password'}
          maxWidth="232px"
          disabled={isSaving}
          onClick={onSubmit}
        />
      }
    >
      <div className="user-profile__settings-content">
        <Input
          label="Current Password"
          placeholder="Current password"
          size="medium"
          value={value.current}
          isPassword
          onChange={onChange('current')}
          autoComplete="current-password"
        />
        <Input
          label="New password"
          placeholder="New password"
          size="medium"
          value={value.next}
          isPassword
          onChange={onChange('next')}
          autoComplete="new-password"
        />
        <Input
          label="Confirm New password"
          placeholder="Confirm new password"
          size="medium"
          value={value.confirm}
          isPassword
          onChange={onChange('confirm')}
          autoComplete="new-password"
        />

        <UserPanelSettingsInfoMessage
          title="Tip:"
          text="Use at least 8 characters, including uppercase and lowercase letters, numbers, and special characters"
        />
      </div>
    </UserPanelSettingsSection>
  );
};
