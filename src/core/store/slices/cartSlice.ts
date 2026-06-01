import { isAxiosError } from 'axios';

import { PRODUCTS } from '@/core/constants';
import { cartService } from '@/core/services';
import { createAppSlice } from '@/core/store/createAppSlice';
import type { ICartDto, IProduct } from '@/core/types';
import {
  cartStorage,
  fetchAndStoreServerCartWithProducts,
  mapCartDtoToProducts,
  toErrorMessage,
  type CartProductsPayload,
} from '@/core/utils';

type CartState = {
  cart: IProduct[];
  cartId: number | null;
  lastAddedProduct: IProduct | null;
  totalPrice: number;
  totalAmount: number;
  loading: boolean;
  error: string | null;
};

type RemoveProductPayload = {
  phoneId: number;
  amount: number;
};

type AddProductPayload = number | IProduct;

const MISSING_USER_CART_ERROR = 'MISSING_USER_CART';

const initialState: CartState = {
  cart: [],
  cartId: null,
  lastAddedProduct: null,
  totalPrice: 0,
  totalAmount: 0,
  loading: false,
  error: null,
};

const applyCartState = (state: CartState, cart: ICartDto, backendProducts: IProduct[] = []) => {
  state.cartId = cart.id;
  state.totalPrice = cart.totalPrice;
  state.totalAmount = cart.totalAmount;
  state.cart = mapCartDtoToProducts(cart, backendProducts);
  state.error = null;
};

const isMissingUserCartError = (error: unknown) =>
  isAxiosError<{ detail?: string }>(error) &&
  error.response?.status === 404 &&
  error.response.data?.detail?.includes('Cart for user');

const getProductFromPayload = (payload: AddProductPayload) =>
  typeof payload === 'number' ? PRODUCTS.find((product) => product.id === payload) : payload;

const persistLocalCartState = (state: CartState) => {
  cartStorage.set({
    id: state.cartId,
    totalPrice: state.totalPrice,
    totalAmount: state.totalAmount,
    cartItems: state.cart.map(({ id, amount }) => ({
      phoneId: id,
      amount,
    })),
  });
};

const addProductLocally = (state: CartState, payload: AddProductPayload) => {
  const product = getProductFromPayload(payload);

  if (!product) {
    state.error = 'Cart is temporarily unavailable';
    return;
  }

  const existingProduct = state.cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.amount += 1;
    state.lastAddedProduct = existingProduct;
  } else {
    const cartProduct = { ...product, amount: 1 };
    state.cart.push(cartProduct);
    state.lastAddedProduct = cartProduct;
  }

  state.totalAmount += 1;
  state.totalPrice += product.price;
  state.error = null;
  persistLocalCartState(state);
};

const increaseProductLocally = (state: CartState, phoneId: number) => {
  const product = state.cart.find((item) => item.id === phoneId);

  if (!product) return;

  product.amount += 1;
  state.totalAmount += 1;
  state.totalPrice += product.price;
  state.error = null;
  persistLocalCartState(state);
};

const decreaseProductLocally = (state: CartState, phoneId: number, amount = 1) => {
  const product = state.cart.find((item) => item.id === phoneId);

  if (!product) return;

  const amountToRemove = Math.min(amount, product.amount);
  product.amount -= amountToRemove;
  state.totalAmount -= amountToRemove;
  state.totalPrice -= product.price * amountToRemove;

  if (product.amount <= 0) {
    state.cart = state.cart.filter((item) => item.id !== phoneId);
  }

  state.error = null;
  persistLocalCartState(state);
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
          return rejectWithValue(
            toErrorMessage(error, 'Failed to hydrate cart from local storage')
          );
        }
      },
      {
        fulfilled: (state, action) => {
          if (!action.payload) return;
          applyCartState(state, action.payload);
        },
      }
    ),
    fetchCart: create.asyncThunk<CartProductsPayload, void, { rejectValue: string }>(
      async (_, { rejectWithValue }) => {
        try {
          return await fetchAndStoreServerCartWithProducts();
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
          applyCartState(state, action.payload.cart, action.payload.products);
        },
        rejected: (state, action) => {
          state.error = action.payload ?? 'Failed to fetch cart';
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    addProduct: create.asyncThunk<CartProductsPayload, AddProductPayload, { rejectValue: string }>(
      async (payload, { rejectWithValue }) => {
        const phoneId = typeof payload === 'number' ? payload : payload.id;

        try {
          await cartService.putItem({ phoneId, amount: 1 });
          return await fetchAndStoreServerCartWithProducts();
        } catch (error) {
          if (isMissingUserCartError(error)) {
            return rejectWithValue(MISSING_USER_CART_ERROR);
          }

          return rejectWithValue(toErrorMessage(error, 'Failed to add product'));
        }
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          const phoneId =
            typeof action.meta.arg === 'number' ? action.meta.arg : action.meta.arg.id;

          applyCartState(state, action.payload.cart, action.payload.products);
          state.lastAddedProduct =
            getProductFromPayload(action.meta.arg) ??
            action.payload.products.find((product) => product.id === phoneId) ??
            null;
        },
        rejected: (state, action) => {
          if (action.payload === MISSING_USER_CART_ERROR) {
            addProductLocally(state, action.meta.arg);
            return;
          }

          state.error = action.payload ?? 'Failed to add product';
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    increaseAmount: create.asyncThunk<CartProductsPayload, number, { rejectValue: string }>(
      async (phoneId, { rejectWithValue }) => {
        try {
          await cartService.putItem({ phoneId, amount: 1 });
          return await fetchAndStoreServerCartWithProducts();
        } catch (error) {
          if (isMissingUserCartError(error)) {
            return rejectWithValue(MISSING_USER_CART_ERROR);
          }

          return rejectWithValue(toErrorMessage(error, 'Failed to increase amount'));
        }
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          applyCartState(state, action.payload.cart, action.payload.products);
        },
        rejected: (state, action) => {
          if (action.payload === MISSING_USER_CART_ERROR) {
            increaseProductLocally(state, action.meta.arg);
            return;
          }

          state.error = action.payload ?? 'Failed to increase amount';
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    decreaseAmount: create.asyncThunk<CartProductsPayload, number, { rejectValue: string }>(
      async (phoneId, { rejectWithValue }) => {
        try {
          await cartService.removeItem({ phoneId, amount: 1 });
          return await fetchAndStoreServerCartWithProducts();
        } catch (error) {
          if (isMissingUserCartError(error)) {
            return rejectWithValue(MISSING_USER_CART_ERROR);
          }

          return rejectWithValue(toErrorMessage(error, 'Failed to decrease amount'));
        }
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          applyCartState(state, action.payload.cart, action.payload.products);
        },
        rejected: (state, action) => {
          if (action.payload === MISSING_USER_CART_ERROR) {
            decreaseProductLocally(state, action.meta.arg);
            return;
          }

          state.error = action.payload ?? 'Failed to decrease amount';
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    removeProduct: create.asyncThunk<
      CartProductsPayload,
      RemoveProductPayload,
      { rejectValue: string }
    >(
      async ({ phoneId, amount }, { rejectWithValue }) => {
        try {
          await cartService.removeItem({ phoneId, amount });
          return await fetchAndStoreServerCartWithProducts();
        } catch (error) {
          if (isMissingUserCartError(error)) {
            return rejectWithValue(MISSING_USER_CART_ERROR);
          }

          return rejectWithValue(toErrorMessage(error, 'Failed to remove product'));
        }
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          applyCartState(state, action.payload.cart, action.payload.products);
        },
        rejected: (state, action) => {
          if (action.payload === MISSING_USER_CART_ERROR) {
            decreaseProductLocally(state, action.meta.arg.phoneId, action.meta.arg.amount);
            return;
          }

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
      state.lastAddedProduct = null;
      cartStorage.clear();
    }),
    closeAddToCartModal: create.reducer((state) => {
      state.lastAddedProduct = null;
    }),
  }),
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
