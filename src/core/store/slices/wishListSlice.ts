import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Product = {
  id: number;
  name: string;
  price: number;
  amount: number;
};

type WishListState = {
  wishList: Product[];
};

const initialState: WishListState = {
  wishList: [],
};

const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    addProductToWishList(state, action: PayloadAction<Product>) {
      const existingProduct = state.wishList.find((item) => item.id === action.payload.id);

      if (existingProduct) {
        existingProduct.amount += 1;
      } else {
        state.wishList.push({ ...action.payload, amount: 1 });
      }
    },
    removeProductFromWishList(state, action: PayloadAction<number>) {
      state.wishList = state.wishList.filter((item) => item.id !== action.payload);
    },
    increaseAmount(state, action: PayloadAction<number>) {
      const product = state.wishList.find((p) => p.id === action.payload);
      if (product) product.amount += 1;
    },
    decreaseAmount(state, action: PayloadAction<number>) {
      const product = state.wishList.find((p) => p.id === action.payload);
      if (product && product.amount > 1) product.amount -= 1;
    },
    clearWishList(state) {
      state.wishList = [];
    },
  },
});

export const {
  addProductToWishList,
  removeProductFromWishList,
  clearWishList,
  increaseAmount,
  decreaseAmount,
} = wishListSlice.actions;
export default wishListSlice.reducer;
