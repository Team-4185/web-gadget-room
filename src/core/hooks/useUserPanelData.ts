import { useMemo } from 'react';

import { USER_PANEL_DATA } from '@/core/constants';
import { useSession } from '@/core/store/session';
import { formatDisplayName } from '@/core/utils';

export const useUserPanelData = () => {
  const { user } = useSession();

  return useMemo(() => {
    const displayName = formatDisplayName(user?.email);

    return {
      ...USER_PANEL_DATA,
      greeting: `Welcome back ${displayName}!`,
      profile: {
        fullName: `${displayName} Shevchenko`,
        email: user?.email ?? 'UserAll@gmail.com',
      },
    };
  }, [user?.email]);
};
