import { isAxiosError } from 'axios';

import { PRODUCTS } from '@/core/constants';
import { cartService } from '@/core/services';
import { createAppSlice } from '@/core/store/createAppSlice';
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

type RemoveProductPayload = {
  phoneId: number;
  amount: number;
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

const cartSlice = createAppSlice({
  name: 'cart',
  initialState,
  reducers: (create) => ({
    hydrateFromLocal: create.asyncThunk<ICartDto | null, void, { rejectValue: string }>(
      async (_, { rejectWithValue }) => {
        try {
          return cartStorage.get();
        } catch (error) {
          return rejectWithValue(toErrorMessage(error, 'Failed to hydrate cart from local storage'));
        }
      },
      {
        fulfilled: (state, action) => {
          if (!action.payload) return;
          applyCartState(state, action.payload);
        },
      }
    ),
    fetchCart: create.asyncThunk<ICartDto, void, { rejectValue: string }>(
      async (_, { rejectWithValue }) => {
        try {
          return await fetchAndStoreServerCart();
        } catch (error) {
          return rejectWithValue(toErrorMessage(error, 'Failed to fetch cart'));
        }
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          applyCartState(state, action.payload);
        },
        rejected: (state, action) => {
          state.error = action.payload ?? 'Failed to fetch cart';
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    addProduct: create.asyncThunk<ICartDto, number, { rejectValue: string }>(
      async (phoneId, { rejectWithValue }) => {
        try {
          await cartService.putItem({ phoneId, amount: 1 });
          return await fetchAndStoreServerCart();
        } catch (error) {
          return rejectWithValue(toErrorMessage(error, 'Failed to add product'));
        }
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          applyCartState(state, action.payload);
        },
        rejected: (state, action) => {
          state.error = action.payload ?? 'Failed to add product';
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    increaseAmount: create.asyncThunk<ICartDto, number, { rejectValue: string }>(
      async (phoneId, { rejectWithValue }) => {
        try {
          await cartService.putItem({ phoneId, amount: 1 });
          return await fetchAndStoreServerCart();
        } catch (error) {
          return rejectWithValue(toErrorMessage(error, 'Failed to increase amount'));
        }
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          applyCartState(state, action.payload);
        },
        rejected: (state, action) => {
          state.error = action.payload ?? 'Failed to increase amount';
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    decreaseAmount: create.asyncThunk<ICartDto, number, { rejectValue: string }>(
      async (phoneId, { rejectWithValue }) => {
        try {
          await cartService.removeItem({ phoneId, amount: 1 });
          return await fetchAndStoreServerCart();
        } catch (error) {
          return rejectWithValue(toErrorMessage(error, 'Failed to decrease amount'));
        }
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          applyCartState(state, action.payload);
        },
        rejected: (state, action) => {
          state.error = action.payload ?? 'Failed to decrease amount';
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    removeProduct: create.asyncThunk<ICartDto, RemoveProductPayload, { rejectValue: string }>(
      async ({ phoneId, amount }, { rejectWithValue }) => {
        try {
          await cartService.removeItem({ phoneId, amount });
          return await fetchAndStoreServerCart();
        } catch (error) {
          return rejectWithValue(toErrorMessage(error, 'Failed to remove product'));
        }
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          applyCartState(state, action.payload);
        },
        rejected: (state, action) => {
          state.error = action.payload ?? 'Failed to remove product';
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    clearCartLocal: create.reducer((state) => {
      state.cart = [];
      state.cartId = null;
      state.totalAmount = 0;
      state.totalPrice = 0;
      state.error = null;
    }),
  }),
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;

