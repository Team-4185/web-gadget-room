import type { FC } from 'react';
import type { Control } from 'react-hook-form';

import { User } from '@/assets';
import { FormInput, UserPanelSettingsActionButton, UserPanelSettingsSection } from '@/components';
import { PROFILE_NAME_TOOLTIP, PROFILE_PHONE_TOOLTIP } from '@/core/constants';
import type { UserProfileFormValues } from '@/core/schemas';

import './UserPanelPersonalInfoSection.css';

interface UserPanelPersonalInfoSectionProps {
  control: Control<UserProfileFormValues>;
  isSaving?: boolean;
  onSave: () => void;
}

export const UserPanelPersonalInfoSection: FC<UserPanelPersonalInfoSectionProps> = ({
  control,
  isSaving = false,
  onSave,
}) => {
  return (
    <UserPanelSettingsSection
      icon={<User width={30} height={30} />}
      title="Personal Information"
      subtitle="Update your personal data"
      action={
        <UserPanelSettingsActionButton
          text={isSaving ? 'Saving' : 'Save changes'}
          maxWidth="192px"
          disabled={isSaving}
          onClick={onSave}
        />
      }
    >
      <div className="user-profile__settings-input-grid">
        <FormInput
          name="firstName"
          control={control}
          label="First Name"
          tooltipText={PROFILE_NAME_TOOLTIP}
          required
        />
        <FormInput
          name="lastName"
          control={control}
          label="Last Name"
          tooltipText={PROFILE_NAME_TOOLTIP}
          required
        />
        <FormInput
          name="phoneNumber"
          control={control}
          label="Phone Number"
          tooltipText={PROFILE_PHONE_TOOLTIP}
          required
        />
        <FormInput
          name="city"
          control={control}
          label="City"
          tooltipText={PROFILE_NAME_TOOLTIP}
          required
        />
      </div>
    </UserPanelSettingsSection>
  );
};
