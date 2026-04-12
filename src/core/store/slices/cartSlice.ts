import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

import { PRODUCTS } from '@/core/constants';
import { cartService } from '@/core/services';
import type { RootState } from '@/core/store';
import type { ICartDto, IProduct } from '@/core/types';
import { cartStorage } from '@/core/utils';

type CartState = {
  cart: IProduct[];
  cartId: number | null;
  totalPrice: number;
  totalAmount: number;
  loading: boolean;
  error: string | null;
};

const initialState: CartState = {
  cart: [],
  cartId: null,
  totalPrice: 0,
  totalAmount: 0,
  loading: false,
  error: null,
};

const FALLBACK_IMAGE = '/icons/GraySquare.svg';

const mapCartDtoToProducts = (cart: ICartDto): IProduct[] =>
  cart.cartItems.map(({ phoneId, amount }) => {
    const sourceProduct = PRODUCTS.find((product) => product.id === phoneId);

    if (sourceProduct) {
      return { ...sourceProduct, amount };
    }

    return {
      id: phoneId,
      name: `Phone #${phoneId}`,
      price: 0,
      img: FALLBACK_IMAGE,
      amount,
    };
  });

const applyCartState = (state: CartState, cart: ICartDto) => {
  state.cartId = cart.id;
  state.totalPrice = cart.totalPrice;
  state.totalAmount = cart.totalAmount;
  state.cart = mapCartDtoToProducts(cart);
  state.error = null;
};

const toErrorMessage = (error: unknown, fallback: string) => {
  if (isAxiosError<{ detail?: string }>(error)) {
    return error.response?.data?.detail ?? error.message ?? fallback;
  }

  if (error instanceof Error) return error.message;
  return fallback;
};

const fetchAndStoreServerCart = async () => {
  const cart = await cartService.getCart();
  cartStorage.set(cart);
  return cart;
};

export const hydrateFromLocal = createAsyncThunk<ICartDto | null>('cart/hydrateFromLocal', () => {
  return cartStorage.get();
});

export const fetchCart = createAsyncThunk<ICartDto, void, { rejectValue: string }>(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAndStoreServerCart();
    } catch (error) {
      return rejectWithValue(toErrorMessage(error, 'Failed to fetch cart'));
    }
  }
);

export const addProduct = createAsyncThunk<ICartDto, number, { rejectValue: string }>(
  'cart/addProduct',
  async (phoneId, { rejectWithValue }) => {
    try {
      await cartService.putItem({ phoneId, amount: 1 });
      return await fetchAndStoreServerCart();
    } catch (error) {
      return rejectWithValue(toErrorMessage(error, 'Failed to add product'));
    }
  }
);

export const increaseAmount = createAsyncThunk<ICartDto, number, { rejectValue: string }>(
  'cart/increaseAmount',
  async (phoneId, { rejectWithValue }) => {
    try {
      await cartService.putItem({ phoneId, amount: 1 });
      return await fetchAndStoreServerCart();
    } catch (error) {
      return rejectWithValue(toErrorMessage(error, 'Failed to increase amount'));
    }
  }
);

export const decreaseAmount = createAsyncThunk<ICartDto, number, { rejectValue: string }>(
  'cart/decreaseAmount',
  async (phoneId, { rejectWithValue }) => {
    try {
      await cartService.removeItem({ phoneId, amount: 1 });
      return await fetchAndStoreServerCart();
    } catch (error) {
      return rejectWithValue(toErrorMessage(error, 'Failed to decrease amount'));
    }
  }
);

export const removeProduct = createAsyncThunk<ICartDto, number, { rejectValue: string; state: RootState }>(
  'cart/removeProduct',
  async (phoneId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const amount = state.cart.cart.find((product) => product.id === phoneId)?.amount ?? 1;

      await cartService.removeItem({ phoneId, amount });
      return await fetchAndStoreServerCart();
    } catch (error) {
      return rejectWithValue(toErrorMessage(error, 'Failed to remove product'));
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCartLocal(state) {
      state.cart = [];
      state.cartId = null;
      state.totalAmount = 0;
      state.totalPrice = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrateFromLocal.fulfilled, (state, action) => {
        if (!action.payload) return;
        applyCartState(state, action.payload);
      })
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        applyCartState(state, action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.payload ?? 'Failed to fetch cart';
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        applyCartState(state, action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.payload ?? 'Failed to add product';
      })
      .addCase(increaseAmount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(increaseAmount.fulfilled, (state, action) => {
        applyCartState(state, action.payload);
      })
      .addCase(increaseAmount.rejected, (state, action) => {
        state.error = action.payload ?? 'Failed to increase amount';
      })
      .addCase(decreaseAmount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(decreaseAmount.fulfilled, (state, action) => {
        applyCartState(state, action.payload);
      })
      .addCase(decreaseAmount.rejected, (state, action) => {
        state.error = action.payload ?? 'Failed to decrease amount';
      })
      .addCase(removeProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        applyCartState(state, action.payload);
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.error = action.payload ?? 'Failed to remove product';
      })
      .addMatcher(
        (action) =>
          action.type.endsWith('/fulfilled') &&
          (action.type.startsWith('cart/fetchCart') ||
            action.type.startsWith('cart/addProduct') ||
            action.type.startsWith('cart/increaseAmount') ||
            action.type.startsWith('cart/decreaseAmount') ||
            action.type.startsWith('cart/removeProduct')),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith('/rejected') &&
          (action.type.startsWith('cart/fetchCart') ||
            action.type.startsWith('cart/addProduct') ||
            action.type.startsWith('cart/increaseAmount') ||
            action.type.startsWith('cart/decreaseAmount') ||
            action.type.startsWith('cart/removeProduct')),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const cartActions = {
  ...cartSlice.actions,
  hydrateFromLocal,
  fetchCart,
  addProduct,
  increaseAmount,
  decreaseAmount,
  removeProduct,
};

export default cartSlice.reducer;

