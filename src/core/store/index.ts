import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/core/store/slices/cartSlice';
import wishListReducer from '@/core/store/slices/wishListSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishList: wishListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
