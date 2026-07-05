import type { RootState } from '../store';

export const selectCartProducts = (state: RootState) => state.cart.cart;

export const selectCartId = (state: RootState) => state.cart.cartId;

export const selectCartLastAddedProduct = (state: RootState) => state.cart.lastAddedProduct;

export const selectCartTotalPrice = (state: RootState) => state.cart.totalPrice;

export const selectCartTotalAmount = (state: RootState) => state.cart.totalAmount;

export const selectCartLoading = (state: RootState) => state.cart.loading;

export const selectCartError = (state: RootState) => state.cart.error;

export const selectHasCartItems = (state: RootState) => selectCartTotalAmount(state) > 0;
