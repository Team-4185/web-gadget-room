import { createAppSlice } from '@/core/store/createAppSlice';
import type { ApiPhoneColor, ApiStorageCapacity, ICartDto, IProduct } from '@/core/types';
import {
  MISSING_USER_CART_ERROR,
  addProductLocally,
  addCartLineAndFetchProducts,
  applySelectedProductVariant,
  cartStorage,
  decreaseCartLineAndFetchProducts,
  decreaseProductLocally,
  fetchAndStoreServerCartWithProducts,
  getCartLineRequest,
  getDefaultPhoneColor,
  getDefaultStorageCapacity,
  getProductFromCartPayload,
  increaseProductLocally,
  increaseCartLineAndFetchProducts,
  isMissingUserCartError,
  isSameCartLine,
  mapCartDtoToProducts,
  normalizeAddProductArg,
  persistLocalCartState,
  removeCartItemAndFetchProducts,
  toErrorMessage,
  type AddProductArg,
  type CartLinePayload,
  type CartProductsPayload,
  type CartProductPayload,
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
      CartProductPayload | AddProductArg,
      { rejectValue: string }
    >(
      async (payload, { rejectWithValue }) => {
        const { product } = normalizeAddProductArg(payload);

        try {
          return await addCartLineAndFetchProducts(product);
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
              product.selectedVariantId =
                addedProduct.selectedVariantId ?? product.selectedVariantId;
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
              getProductFromCartPayload(payloadProduct) ??
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
    increaseAmount: create.asyncThunk<
      CartProductsPayload,
      CartLinePayload,
      { rejectValue: string }
    >(
      async (payload, { rejectWithValue }) => {
        try {
          return await increaseCartLineAndFetchProducts(payload);
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
    decreaseAmount: create.asyncThunk<
      CartProductsPayload,
      CartLinePayload,
      { rejectValue: string }
    >(
      async (payload, { rejectWithValue }) => {
        try {
          return await decreaseCartLineAndFetchProducts(payload);
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
          return await removeCartItemAndFetchProducts({ phoneId, variantId, amount });
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
