import { isAxiosError } from 'axios';

import { PRODUCTS } from '@/core/constants';
import { cartService } from '@/core/services';
import { createAppSlice } from '@/core/store/createAppSlice';
import type { ApiPhoneColor, ApiStorageCapacity, ICartDto, IProduct } from '@/core/types';
import {
  cartStorage,
  applySelectedProductVariant,
  fetchAndStoreServerCartWithProducts,
  getDefaultPhoneColor,
  getDefaultStorageCapacity,
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
  variantId?: number;
  amount: number;
};

type AddProductPayload = number | IProduct;
type CartLinePayload = number | IProduct;

type AddProductArg = {
  product: AddProductPayload;
  showConfirmation?: boolean;
};

type UpdateProductColorPayload = {
  phoneId: number;
  variantId?: number;
  colorName: string;
};

type UpdateProductStoragePayload = {
  phoneId: number;
  variantId?: number;
  storageName: string;
};

type UpdateProductVariantPayload = {
  product: IProduct;
  colorName?: string;
  storageName?: string;
};

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

const applyCartState = (state: CartState, cart: ICartDto, products: IProduct[] = []) => {
  const selectedColorsByProductId = new Map(
    state.cart
      .filter((product) => product.selectedColor)
      .map((product) => [product.id, product.selectedColor as ApiPhoneColor])
  );
  const selectedStorageByProductId = new Map(
    state.cart
      .filter((product) => product.selectedStorage)
      .map((product) => [product.id, product.selectedStorage as ApiStorageCapacity])
  );

  state.cartId = cart.id;
  state.totalPrice = cart.totalPrice;
  state.totalAmount = cart.totalAmount;
  state.cart = products.map((product) => ({
    ...product,
    selectedColor:
      product.selectedColor ??
      selectedColorsByProductId.get(product.id) ??
      getDefaultPhoneColor(product.colors),
    selectedStorage:
      product.selectedStorage ??
      selectedStorageByProductId.get(product.id) ??
      getDefaultStorageCapacity(product.storageCapacity),
  }));
  state.error = null;
  persistLocalCartState(state);
};

const isMissingUserCartError = (error: unknown) =>
  isAxiosError<{ detail?: string }>(error) &&
  error.response?.status === 404 &&
  error.response.data?.detail?.includes('Cart for user');

const getProductFromPayload = (payload: AddProductPayload) =>
  typeof payload === 'number' ? PRODUCTS.find((product) => product.id === payload) : payload;

const getCartLineRequest = (product: CartLinePayload, amount = 1) =>
  typeof product === 'number'
    ? { phoneId: product, amount }
    : {
        phoneId: product.id,
        ...(product.selectedVariantId ? { variantId: product.selectedVariantId } : {}),
        amount,
      };

const isSameCartLine = (item: IProduct, phoneId: number, variantId?: number) =>
  item.id === phoneId &&
  (variantId === undefined || item.selectedVariantId === variantId || !item.selectedVariantId);

const normalizeAddProductArg = (payload: AddProductPayload | AddProductArg) =>
  typeof payload === 'object' && 'product' in payload
    ? payload
    : { product: payload, showConfirmation: true };

const persistLocalCartState = (state: CartState) => {
  cartStorage.set({
    id: state.cartId,
    totalPrice: state.totalPrice,
    totalAmount: state.totalAmount,
    cartItems: state.cart.map(({ id, amount, selectedColor, selectedStorage, selectedVariantId }) => ({
      phoneId: id,
      variantId: selectedVariantId,
      amount,
      selectedColor,
      selectedStorage,
    })),
  });
};

const addProductLocally = (state: CartState, payload: AddProductPayload) => {
  const product = getProductFromPayload(payload);

  if (!product) {
    state.error = 'Cart is temporarily unavailable';
    return;
  }

  const existingProduct = state.cart.find((item) =>
    isSameCartLine(item, product.id, product.selectedVariantId)
  );

  if (existingProduct) {
    existingProduct.amount += 1;
    existingProduct.selectedColor =
      product.selectedColor ?? existingProduct.selectedColor ?? getDefaultPhoneColor(product.colors);
    existingProduct.selectedStorage =
      product.selectedStorage ??
      existingProduct.selectedStorage ??
      getDefaultStorageCapacity(product.storageCapacity);
    state.lastAddedProduct = existingProduct;
  } else {
    const cartProduct = {
      ...product,
      amount: 1,
      selectedColor: product.selectedColor ?? getDefaultPhoneColor(product.colors),
      selectedStorage: product.selectedStorage ?? getDefaultStorageCapacity(product.storageCapacity),
    };
    state.cart.push(cartProduct);
    state.lastAddedProduct = cartProduct;
  }

  state.totalAmount += 1;
  state.totalPrice += product.price;
  state.error = null;
  persistLocalCartState(state);
};

const increaseProductLocally = (state: CartState, phoneId: number, variantId?: number) => {
  const product = state.cart.find((item) => isSameCartLine(item, phoneId, variantId));

  if (!product) return;

  product.amount += 1;
  state.totalAmount += 1;
  state.totalPrice += product.price;
  state.error = null;
  persistLocalCartState(state);
};

const decreaseProductLocally = (state: CartState, phoneId: number, amount = 1, variantId?: number) => {
  const product = state.cart.find((item) => isSameCartLine(item, phoneId, variantId));

  if (!product) return;

  const amountToRemove = Math.min(amount, product.amount);
  product.amount -= amountToRemove;
  state.totalAmount -= amountToRemove;
  state.totalPrice -= product.price * amountToRemove;

  if (product.amount <= 0) {
    state.cart = state.cart.filter((item) => !isSameCartLine(item, phoneId, variantId));
  }

  state.error = null;
  persistLocalCartState(state);
};

const cartSlice = createAppSlice({
  name: 'cart',
  initialState,
  reducers: (create) => ({
    hydrateFromLocal: create.asyncThunk<CartProductsPayload | null, void, { rejectValue: string }>(
      async (_, { rejectWithValue }) => {
        try {
          const cart = cartStorage.get();
          if (!cart) return null;

          return {
            cart,
            products: await mapCartDtoToProducts(cart),
          };
        } catch (error) {
          return rejectWithValue(
            toErrorMessage(error, 'Failed to hydrate cart from local storage')
          );
        }
      },
      {
        fulfilled: (state, action) => {
          if (!action.payload) return;
          applyCartState(state, action.payload.cart, action.payload.products);
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
    addProduct: create.asyncThunk<
      CartProductsPayload,
      AddProductPayload | AddProductArg,
      { rejectValue: string }
    >(
      async (payload, { rejectWithValue }) => {
        const { product } = normalizeAddProductArg(payload);
        const request = getCartLineRequest(product);

        try {
          await cartService.putItem(request);
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
          const { product: payloadProduct, showConfirmation = true } = normalizeAddProductArg(
            action.meta.arg
          );
          const addedProduct = typeof payloadProduct === 'number' ? null : payloadProduct;
          const phoneId = addedProduct ? addedProduct.id : payloadProduct;

          applyCartState(state, action.payload.cart, action.payload.products);
          if (addedProduct?.selectedColor || addedProduct?.selectedStorage) {
            const product = state.cart.find((item) =>
              isSameCartLine(item, addedProduct.id, addedProduct.selectedVariantId)
            );
            if (product) {
              product.selectedVariantId = addedProduct.selectedVariantId ?? product.selectedVariantId;
              product.selectedColor = addedProduct.selectedColor ?? product.selectedColor;
              product.selectedStorage = addedProduct.selectedStorage ?? product.selectedStorage;
              if (showConfirmation) {
                state.lastAddedProduct = product;
              }
            }
          }

          if (showConfirmation) {
            state.lastAddedProduct =
              state.lastAddedProduct ??
              getProductFromPayload(payloadProduct) ??
              action.payload.products.find((product) => product.id === phoneId) ??
              null;
          } else {
            state.lastAddedProduct = null;
          }
        },
        rejected: (state, action) => {
          const { product, showConfirmation = true } = normalizeAddProductArg(action.meta.arg);

          if (action.payload === MISSING_USER_CART_ERROR) {
            addProductLocally(state, product);
            if (!showConfirmation) {
              state.lastAddedProduct = null;
            }
            return;
          }

          state.error = action.payload ?? 'Failed to add product';
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    increaseAmount: create.asyncThunk<CartProductsPayload, CartLinePayload, { rejectValue: string }>(
      async (payload, { rejectWithValue }) => {
        try {
          await cartService.putItem(getCartLineRequest(payload));
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
            const request = getCartLineRequest(action.meta.arg);
            increaseProductLocally(state, request.phoneId, request.variantId);
            return;
          }

          state.error = action.payload ?? 'Failed to increase amount';
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    decreaseAmount: create.asyncThunk<CartProductsPayload, CartLinePayload, { rejectValue: string }>(
      async (payload, { rejectWithValue }) => {
        try {
          await cartService.removeItem(getCartLineRequest(payload));
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
            const request = getCartLineRequest(action.meta.arg);
            decreaseProductLocally(state, request.phoneId, request.amount, request.variantId);
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
      async ({ phoneId, amount, variantId }, { rejectWithValue }) => {
        try {
          await cartService.removeItem({ phoneId, variantId, amount });
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
            decreaseProductLocally(
              state,
              action.meta.arg.phoneId,
              action.meta.arg.amount,
              action.meta.arg.variantId
            );
            return;
          }

          state.error = action.payload ?? 'Failed to remove product';
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    updateProductVariant: create.asyncThunk<
      CartProductsPayload,
      UpdateProductVariantPayload,
      { rejectValue: string }
    >(
      async ({ product, colorName, storageName }, { rejectWithValue }) => {
        const nextProduct = applySelectedProductVariant(
          product,
          colorName ?? product.selectedColor?.name,
          storageName ?? product.selectedStorage?.name
        );

        try {
          if (nextProduct.selectedVariantId !== product.selectedVariantId) {
            await cartService.removeItem(getCartLineRequest(product, product.amount));
            await cartService.putItem(getCartLineRequest(nextProduct, product.amount));
          }

          return await fetchAndStoreServerCartWithProducts();
        } catch (error) {
          if (isMissingUserCartError(error)) {
            return rejectWithValue(MISSING_USER_CART_ERROR);
          }

          return rejectWithValue(toErrorMessage(error, 'Failed to update product variant'));
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
            const { product, colorName, storageName } = action.meta.arg;
            const cartProduct = state.cart.find((item) =>
              isSameCartLine(item, product.id, product.selectedVariantId)
            );

            if (cartProduct) {
              Object.assign(
                cartProduct,
                applySelectedProductVariant(
                  cartProduct,
                  colorName ?? cartProduct.selectedColor?.name,
                  storageName ?? cartProduct.selectedStorage?.name
                )
              );
              persistLocalCartState(state);
            }

            return;
          }

          state.error = action.payload ?? 'Failed to update product variant';
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
    updateProductColor: create.reducer<UpdateProductColorPayload>((state, action) => {
      const product = state.cart.find((item) =>
        isSameCartLine(item, action.payload.phoneId, action.payload.variantId)
      );

      if (!product) return;

      Object.assign(
        product,
        applySelectedProductVariant(
          product,
          action.payload.colorName,
          product.selectedStorage?.name
        )
      );
      state.error = null;
      persistLocalCartState(state);
    }),
    updateProductStorage: create.reducer<UpdateProductStoragePayload>((state, action) => {
      const product = state.cart.find((item) =>
        isSameCartLine(item, action.payload.phoneId, action.payload.variantId)
      );

      if (!product) return;

      Object.assign(
        product,
        applySelectedProductVariant(
          product,
          product.selectedColor?.name,
          action.payload.storageName
        )
      );
      state.error = null;
      persistLocalCartState(state);
    }),
  }),
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
