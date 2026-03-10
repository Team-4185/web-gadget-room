import { useMemo } from 'react';

import { USER_PANEL_DATA } from '@/core/constants';
import { useAppSelector } from '@/core/store';
import { formatDisplayName } from '@/core/utils';

export const useUserPanelData = () => {
  const email = useAppSelector((state) => state.auth.email);

  return useMemo(() => {
    const displayName = formatDisplayName(email);

    return {
      ...USER_PANEL_DATA,
      greeting: `Welcome back ${displayName}!`,
      profile: {
        fullName: `${displayName} Shevchenko`,
        email: email || 'UserAll@gmail.com',
      },
    };
  }, [email]);
};
