import { useEffect } from 'react';
import { Outlet } from 'react-router';

import { Footer, Header, ScrollToTop } from '@/components';
import {
  useAppDispatch,
  useAppSelector,
  authActions,
  cartActions,
  wishListActions,
} from '@/core/store';
import { tokenStorage } from '@/core/utils';

import './App.css';

const App = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.userId);
  const authLoading = useAppSelector((state) => state.auth.authLoading);

  useEffect(() => {
    if (tokenStorage.hasSession()) {
      dispatch(authActions.refreshToken());
    } else {
      dispatch(authActions.finishAuthLoading());
    }
    dispatch(cartActions.hydrateFromLocal());
  }, [dispatch]);

  useEffect(() => {
    if (authLoading) return;

    if (!userId) {
      dispatch(wishListActions.clearWishList());
      return;
    }

    dispatch(cartActions.fetchCart());
    dispatch(wishListActions.fetchFavorites());
  }, [authLoading, dispatch, userId]);

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
