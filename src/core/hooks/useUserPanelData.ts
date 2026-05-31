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

export const useUserPanelData = (
  profileInfo: UpdateUserProfilePayload = EMPTY_PROFILE,
  ordersCount = 0,
  favoritesCount = 0
) => {
  const email = useAppSelector((state) => state.auth.email);
  const { firstName, lastName, city, phoneNumber } = profileInfo;

  return useMemo(() => {
    const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
    const displayName = fullName || 'Guest';

    return {
      ...USER_PANEL_DATA,
      greeting: `Welcome back, ${displayName}!`,
      menu: USER_PANEL_DATA.menu.map((item) =>
        item.id === 'orders'
          ? { ...item, badge: ordersCount }
          : item.id === 'favorite'
            ? { ...item, badge: favoritesCount }
            : item
      ),
      stats: USER_PANEL_DATA.stats.map((item) =>
        item.id === 'orders'
          ? { ...item, value: ordersCount }
          : item.id === 'favorites'
            ? { ...item, value: favoritesCount }
            : item
      ),
      profile: {
        firstName,
        lastName,
        city,
        phoneNumber,
        fullName: displayName,
        email: email || 'UserAll@gmail.com',
      },
    };
  }, [city, email, favoritesCount, firstName, lastName, ordersCount, phoneNumber]);
};
