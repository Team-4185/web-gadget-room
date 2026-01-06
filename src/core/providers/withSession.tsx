import { SessionProvider } from '@/core/store/session';

export const withSession = (component: () => React.ReactNode) => () => (
  <SessionProvider>{component()}</SessionProvider>
);
