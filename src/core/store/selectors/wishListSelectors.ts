import type { RootState } from '../store';

export const selectWishListProducts = (state: RootState) => state.wishList.wishList;

export const selectWishListLoading = (state: RootState) => state.wishList.loading;

export const selectWishListError = (state: RootState) => state.wishList.error;
