const ACCESS_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';
const EMAIL_KEY = 'userEmail';
const UID_KEY = 'userId';

export const tokenStorage = {
  get() {
    return {
      accessToken: localStorage.getItem(ACCESS_KEY) ?? null,
      refreshToken: localStorage.getItem(REFRESH_KEY) ?? null,
      email: localStorage.getItem(EMAIL_KEY) ?? null,
      userId: localStorage.getItem(UID_KEY)
        ? Number(localStorage.getItem(UID_KEY))
        : null,
    };
  },
  set({ accessToken, refreshToken, email, userId }:
      { accessToken: string; refreshToken: string; email: string; userId: number }) {
    localStorage.setItem(ACCESS_KEY, accessToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EMAIL_KEY, email);
    localStorage.setItem(UID_KEY, String(userId));
  },
  clear() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EMAIL_KEY);
    localStorage.removeItem(UID_KEY);
  },
};
