import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Product = {
  id: number;
  name: string;
  price: number;
  amount: number;
};

type CartState = {
  cart: Product[];
};

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      const existingProduct = state.cart.find((item) => item.id === action.payload.id);

      if (existingProduct) {
        existingProduct.amount += 1;
      } else {
        state.cart.push({ ...action.payload, amount: 1 });
      }
    },
    removeProduct(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increaseAmount(state, action: PayloadAction<number>) {
      const product = state.cart.find((p) => p.id === action.payload);
      if (product) product.amount += 1;
    },
    decreaseAmount(state, action: PayloadAction<number>) {
      const product = state.cart.find((p) => p.id === action.payload);
      if (product && product.amount > 1) product.amount -= 1;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { addProduct, removeProduct, clearCart, increaseAmount, decreaseAmount } =
  cartSlice.actions;
export default cartSlice.reducer;
