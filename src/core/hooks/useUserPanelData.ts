import { useMemo } from 'react';

import { USER_PANEL_DATA } from '@/core/constants';
import { useAppSelector } from '@/core/store';
import type { UpdateUserProfilePayload } from '@/core/types';

const EMPTY_PROFILE: UpdateUserProfilePayload = {
  firstName: '',
  lastName: '',
  city: '',
  phoneNumber: '',
};

export const useUserPanelData = (profileInfo: UpdateUserProfilePayload = EMPTY_PROFILE) => {
  const email = useAppSelector((state) => state.auth.email);
  const { firstName, lastName, city, phoneNumber } = profileInfo;

  return useMemo(() => {
    const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
    const displayName = fullName || 'Guest';

    return {
      ...USER_PANEL_DATA,
      greeting: `Welcome back ${displayName}!`,
      profile: {
        firstName,
        lastName,
        city,
        phoneNumber,
        fullName: displayName,
        email: email || 'UserAll@gmail.com',
      },
    };
  }, [city, email, firstName, lastName, phoneNumber]);
};
