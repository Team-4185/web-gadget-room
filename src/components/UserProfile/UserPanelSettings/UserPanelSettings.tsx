import { useState, type ChangeEvent, type FC } from 'react';
import { Typography } from '@mui/material';

import {
  UserPanelEmailSection,
  UserPanelNotificationsSection,
  UserPanelPasswordSection,
  UserPanelPersonalInfoSection,
} from '@/components';

import './UserPanelSettings.css';

interface UserPanelSettingsProps {
  email: string;
}

export const UserPanelSettings: FC<UserPanelSettingsProps> = ({ email }) => {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    country: '',
    city: '',
    phoneNumber: '',
  });
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

      <UserPanelPersonalInfoSection value={personalInfo} onChange={handlePersonalInfoChange} />
      <UserPanelEmailSection value={emailState} onChange={handleEmailChange} />
      <UserPanelPasswordSection value={passwordState} onChange={handlePasswordChange} />
      <UserPanelNotificationsSection value={notificationState} onToggle={handleNotificationToggle} />
    </div>
  );
};
