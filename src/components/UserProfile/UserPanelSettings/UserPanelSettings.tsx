import { useEffect, useState, type ChangeEvent, type FC } from 'react';
import { Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import {
  UserPanelEmailSection,
  UserPanelNotificationsSection,
  UserPanelPasswordSection,
  UserPanelPersonalInfoSection,
} from '@/components';
import { usersService } from '@/core/services';
import { toErrorMessage } from '@/core/utils';
import type { UpdateUserProfilePayload } from '@/core/types';

import './UserPanelSettings.css';

interface UserPanelSettingsProps {
  userId: number | null;
  email: string;
  profile: UpdateUserProfilePayload;
  onProfileSaved: (profile: UpdateUserProfilePayload) => void;
}

export const UserPanelSettings: FC<UserPanelSettingsProps> = ({
  userId,
  email,
  profile,
  onProfileSaved,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [personalInfo, setPersonalInfo] = useState<UpdateUserProfilePayload>(profile);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [emailState, setEmailState] = useState({
    current: email,
    next: '',
  });
  const [passwordState, setPasswordState] = useState({
    current: '',
    next: '',
    confirm: '',
  });
  const [notificationState, setNotificationState] = useState({
    orderUpdates: false,
    promotions: true,
    newArrivals: true,
  });

  useEffect(() => {
    setPersonalInfo(profile);
  }, [profile]);

  const handlePersonalInfoChange =
    (key: keyof typeof personalInfo) => (event: ChangeEvent<HTMLInputElement>) => {
      setPersonalInfo((prev) => ({ ...prev, [key]: event.target.value }));
    };
  const handlePasswordChange =
    (key: keyof typeof passwordState) => (event: ChangeEvent<HTMLInputElement>) => {
      setPasswordState((prev) => ({ ...prev, [key]: event.target.value }));
    };
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailState((prev) => ({ ...prev, next: event.target.value }));
  };
  const handleNotificationToggle = (key: keyof typeof notificationState) => {
    setNotificationState((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const handleProfileSave = async () => {
    if (!userId) {
      enqueueSnackbar('Unable to update profile without a user account.', { variant: 'error' });
      return;
    }

    const payload: UpdateUserProfilePayload = {
      firstName: personalInfo.firstName.trim(),
      lastName: personalInfo.lastName.trim(),
      city: personalInfo.city.trim(),
      phoneNumber: personalInfo.phoneNumber.trim(),
    };

    setIsSavingProfile(true);

    try {
      const updatedProfile = await usersService.updateProfile(userId, payload);
      const nextProfile = {
        firstName: updatedProfile.firstName ?? payload.firstName,
        lastName: updatedProfile.lastName ?? payload.lastName,
        city: updatedProfile.city ?? payload.city,
        phoneNumber: updatedProfile.phoneNumber ?? payload.phoneNumber,
      };

      setPersonalInfo(nextProfile);
      onProfileSaved(nextProfile);
      enqueueSnackbar('Profile updated.', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(toErrorMessage(error, 'Failed to update profile.'), { variant: 'error' });
    } finally {
      setIsSavingProfile(false);
    }
  };

  return (
    <div className="user-profile__settings" aria-label="Account settings">
      <div className="user-profile__settings-head">
        <Typography component="h2" sx={{ fontSize: '32px', fontWeight: 700, lineHeight: 1 }}>
          Account settings
        </Typography>
        <Typography component="p" sx={{ fontSize: '20px', fontWeight: 500, lineHeight: 1 }}>
          Manage your personal data and security
        </Typography>
      </div>

      <UserPanelPersonalInfoSection
        value={personalInfo}
        onChange={handlePersonalInfoChange}
        isSaving={isSavingProfile}
        onSave={handleProfileSave}
      />
      <UserPanelEmailSection value={emailState} onChange={handleEmailChange} />
      <UserPanelPasswordSection value={passwordState} onChange={handlePasswordChange} />
      <UserPanelNotificationsSection value={notificationState} onToggle={handleNotificationToggle} />
    </div>
  );
};
