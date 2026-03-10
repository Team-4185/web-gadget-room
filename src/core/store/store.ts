import { configureStore } from '@reduxjs/toolkit';
import { cartReducer, wishListReducer, authReducer } from '@/core/store';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishList: wishListReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
