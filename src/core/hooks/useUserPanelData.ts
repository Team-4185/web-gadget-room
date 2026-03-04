import { useMemo } from 'react';

import { USER_PANEL_DATA } from '@/core/constants';
import { useSession } from '@/core/store/session';

const formatDisplayName = (email?: string | null) => {
  if (!email) return 'Taras';
  const rawName = email.split('@')[0];
  if (!rawName) return 'Taras';
  return rawName.charAt(0).toUpperCase() + rawName.slice(1);
};

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
