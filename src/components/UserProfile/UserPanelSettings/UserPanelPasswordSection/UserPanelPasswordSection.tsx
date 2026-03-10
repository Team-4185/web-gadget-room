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
}

export const UserPanelPasswordSection: FC<UserPanelPasswordSectionProps> = ({
  value,
  onChange,
}) => {
  return (
    <UserPanelSettingsSection
      icon={<Settings width={30} height={30} />}
      title="Change password"
      subtitle="Update your password for security"
      action={<UserPanelSettingsActionButton text="Change password" maxWidth="232px" />}
    >
      <div className="user-profile__settings-content">
        <Input
          label="Current Password"
          placeholder="Current password"
          size="medium"
          value={value.current}
          isPassword
          onChange={onChange('current')}
        />
        <Input
          label="New Password"
          placeholder="New password"
          size="medium"
          value={value.next}
          isPassword
          onChange={onChange('next')}
        />
        <Input
          label="Confirm New Password"
          placeholder="Confirm new password"
          size="medium"
          value={value.confirm}
          isPassword
          onChange={onChange('confirm')}
        />

        <UserPanelSettingsInfoMessage
          title="Tip:"
          text="Use at least 8 characters, including uppercase and lowercase letters, numbers, and special characters"
        />
      </div>
    </UserPanelSettingsSection>
  );
};
