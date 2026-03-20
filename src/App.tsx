import { useEffect } from 'react';

import { Footer, Header, ScrollToTop } from '@/components';
import { AppRoutes } from '@/routes';
import { useAppDispatch, authActions } from '@/core/store';

import './App.css';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authActions.refreshToken());
  }, []);

  return (
    <>
      <Header />
      <main>
        <ScrollToTop />
        <AppRoutes />
      </main>
      <Footer />
    </>
  );
};

export default App;
