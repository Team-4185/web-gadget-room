import { useEffect } from 'react';
import { Outlet } from 'react-router';

import { Footer, Header, ScrollToTop } from '@/components';
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
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
