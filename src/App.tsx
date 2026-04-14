import { useEffect } from 'react';
import { Outlet } from 'react-router';

import { Footer, Header, ScrollToTop } from '@/components';
import { useAppDispatch, useAppSelector, authActions, cartActions } from '@/core/store';

import './App.css';

const App = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.userId);

  useEffect(() => {
    dispatch(authActions.refreshToken());
    dispatch(cartActions.hydrateFromLocal());
  }, [dispatch]);

  useEffect(() => {
    if (!userId) return;

    dispatch(cartActions.fetchCart());
  }, [dispatch, userId]);

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
