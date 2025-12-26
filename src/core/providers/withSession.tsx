import { SessionProvider } from '../store/session';

export const withSession = (component: () => React.ReactNode) => () => (
  <SessionProvider>{component()}</SessionProvider>
);
