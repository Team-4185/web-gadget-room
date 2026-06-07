import { hasAccessToken, refreshAuthSession } from '@/core/config';
import { tokenStorage } from '@/core/utils/tokenStorage';

export const ensureAccessTokenForLoader = async () => {
  if (!tokenStorage.hasSession() || hasAccessToken()) return;

  await refreshAuthSession();
};
