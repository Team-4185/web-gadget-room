import type { ChangeEvent, FC } from 'react';

import { User } from '@/assets';
import { Input, UserPanelSettingsActionButton, UserPanelSettingsSection } from '@/components';

import './UserPanelPersonalInfoSection.css';

interface PersonalInfoState {
  firstName: string;
  lastName: string;
  streetAddress: string;
  country: string;
  city: string;
  phoneNumber: string;
}

interface UserPanelPersonalInfoSectionProps {
  value: PersonalInfoState;
  onChange: (key: keyof PersonalInfoState) => (event: ChangeEvent<HTMLInputElement>) => void;
}

export const UserPanelPersonalInfoSection: FC<UserPanelPersonalInfoSectionProps> = ({
  value,
  onChange,
}) => {
  return (
    <UserPanelSettingsSection
      icon={<User width={30} height={30} />}
      title="Personal Information"
      subtitle="Update your personal data"
      action={<UserPanelSettingsActionButton text="Save changes" maxWidth="192px" />}
    >
      <div className="user-profile__settings-input-grid">
        <Input
          label="First Name"
          placeholder="First Name"
          value={value.firstName}
          onChange={onChange('firstName')}
        />
        <Input
          label="Last Name"
          placeholder="Last Name"
          value={value.lastName}
          onChange={onChange('lastName')}
        />
        <Input
          label="Street Address"
          placeholder="Street Address"
          value={value.streetAddress}
          onChange={onChange('streetAddress')}
        />
        <Input
          label="Country"
          placeholder="Country"
          value={value.country}
          onChange={onChange('country')}
        />
        <Input label="City" placeholder="City" value={value.city} onChange={onChange('city')} />
        <Input
          label="Phone Number"
          placeholder="Phone Number"
          value={value.phoneNumber}
          onChange={onChange('phoneNumber')}
        />
      </div>
    </UserPanelSettingsSection>
  );
};
