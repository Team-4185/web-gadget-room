import { PRODUCTS } from '@/core/constants';
import type { IProduct } from '@/core/types';

import { cartStorage } from './cartStorage';
import { getDefaultPhoneColor, getDefaultStorageCapacity } from './productVariants';

export type CartProductPayload = number | IProduct;

type CartLocalState = {
  cart: IProduct[];
  cartId: number | null;
  totalPrice: number;
  totalAmount: number;
  lastAddedProduct: IProduct | null;
  error: string | null;
};

export const getProductFromCartPayload = (payload: CartProductPayload) =>
  typeof payload === 'number' ? PRODUCTS.find((product) => product.id === payload) : payload;

export const isSameCartLine = (item: IProduct, phoneId: number, variantId?: number) =>
  item.id === phoneId &&
  (variantId === undefined || item.selectedVariantId === variantId || !item.selectedVariantId);

export const persistLocalCartState = (state: CartLocalState) => {
  cartStorage.set({
    id: state.cartId,
    totalPrice: state.totalPrice,
    totalAmount: state.totalAmount,
    cartItems: state.cart.map(
      ({ id, amount, selectedColor, selectedStorage, selectedVariantId }) => ({
        phoneId: id,
        variantId: selectedVariantId,
        amount,
        selectedColor,
        selectedStorage,
      })
    ),
  });
};

export const addProductLocally = (state: CartLocalState, payload: CartProductPayload) => {
  const product = getProductFromCartPayload(payload);

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
      product.selectedColor ??
      existingProduct.selectedColor ??
      getDefaultPhoneColor(product.colors);
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
      selectedStorage:
        product.selectedStorage ?? getDefaultStorageCapacity(product.storageCapacity),
    };
    state.cart.push(cartProduct);
    state.lastAddedProduct = cartProduct;
  }

  state.totalAmount += 1;
  state.totalPrice += product.price;
  state.error = null;
  persistLocalCartState(state);
};

export const increaseProductLocally = (
  state: CartLocalState,
  phoneId: number,
  variantId?: number
) => {
  const product = state.cart.find((item) => isSameCartLine(item, phoneId, variantId));

  if (!product) return;

  product.amount += 1;
  state.totalAmount += 1;
  state.totalPrice += product.price;
  state.error = null;
  persistLocalCartState(state);
};

export const decreaseProductLocally = (
  state: CartLocalState,
  phoneId: number,
  amount = 1,
  variantId?: number
) => {
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
