import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { usersService } from '@/core/services';
import {
  authActions,
  selectWishListError,
  selectWishListLoading,
  selectWishListProducts,
  useAppDispatch,
  useAppSelector,
} from '@/core/store';
import type { UpdateUserProfilePayload, UserPanelTab } from '@/core/types';
import { useUserOrders } from './useUserOrders';
import { useUserPanelData } from './useUserPanelData';

const EMPTY_PROFILE_INFO: UpdateUserProfilePayload = {
  firstName: '',
  lastName: '',
  city: '',
  phoneNumber: '',
};

const getInitialTab = (requestedTab: string | null): UserPanelTab =>
  requestedTab === 'favorite' ? 'favorite' : 'overview';

export const useUserProfilePage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.userId);
  const favorites = useAppSelector(selectWishListProducts);
  const favoritesLoading = useAppSelector(selectWishListLoading);
  const favoritesError = useAppSelector(selectWishListError);
  const [profileInfo, setProfileInfo] = useState<UpdateUserProfilePayload>(EMPTY_PROFILE_INFO);
  const [profileEmail, setProfileEmail] = useState('');
  const {
    orders,
    totalElements,
    loading: ordersLoading,
    error: ordersError,
  } = useUserOrders(0, 10);
  const requestedTab = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<UserPanelTab>(() => getInitialTab(requestedTab));
  const { greeting, subtitle, menu, stats, profile } = useUserPanelData(
    profileInfo,
    totalElements,
    favorites.length,
    profileEmail
  );

  useEffect(() => {
    if (!userId) return;

    const controller = new AbortController();

    usersService
      .getCurrentUser(controller.signal)
      .then((user) => {
        if (controller.signal.aborted) return;

        setProfileInfo({
          firstName: user.firstName ?? '',
          lastName: user.lastName ?? '',
          city: user.city ?? '',
          phoneNumber: user.phoneNumber ?? '',
        });
        setProfileEmail(user.email ?? '');
      })
      .catch(() => {
        if (controller.signal.aborted) return;
      });

    return () => {
      controller.abort();
    };
  }, [userId]);

  useEffect(() => {
    if (requestedTab === 'favorite') {
      setActiveTab('favorite');
    }
  }, [requestedTab]);

  const handleTabChange = (tab: UserPanelTab) => {
    setActiveTab(tab);

    if (tab === 'favorite') {
      setSearchParams({ tab: 'favorite' }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  const handleLogout = async () => {
    await dispatch(authActions.logout());
    navigate('/login');
  };

  return {
    activeTab,
    userId,
    profile,
    profileInfo,
    greeting,
    subtitle,
    menu,
    stats,
    orders,
    recentOrders: orders.slice(0, 2),
    ordersLoading,
    ordersError,
    favorites,
    favoritesLoading,
    favoritesError,
    handleTabChange,
    handleLogout,
    setProfileInfo,
    setProfileEmail,
    openProduct: (productId: number) => navigate(`/product/${productId}`),
  };
};
