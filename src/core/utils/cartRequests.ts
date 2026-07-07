import { isAxiosError } from 'axios';

import { cartService } from '@/core/services';
import type { IProduct } from '@/core/types';

import { fetchAndStoreServerCartWithProducts } from './cart';
import type { CartProductPayload } from './cartLocalState';

export const MISSING_USER_CART_ERROR = 'MISSING_USER_CART';

export type CartLinePayload = number | IProduct;

export type CartLineRequest = {
  phoneId: number;
  variantId?: number;
  amount: number;
};

export const getCartLineRequest = (product: CartLinePayload, amount = 1): CartLineRequest =>
  typeof product === 'number'
    ? { phoneId: product, amount }
    : {
        phoneId: product.id,
        ...(product.selectedVariantId ? { variantId: product.selectedVariantId } : {}),
        amount,
      };

export const isMissingUserCartError = (error: unknown) =>
  isAxiosError<{ detail?: string }>(error) &&
  error.response?.status === 404 &&
  error.response.data?.detail?.includes('Cart for user');

export const putCartLineAndFetchProducts = async (product: CartLinePayload, amount = 1) => {
  await cartService.putItem(getCartLineRequest(product, amount));
  return fetchAndStoreServerCartWithProducts();
};

export const removeCartLineAndFetchProducts = async (product: CartLinePayload, amount = 1) => {
  await cartService.removeItem(getCartLineRequest(product, amount));
  return fetchAndStoreServerCartWithProducts();
};

export const addCartLineAndFetchProducts = (product: CartProductPayload) =>
  putCartLineAndFetchProducts(product);

export const increaseCartLineAndFetchProducts = (payload: CartLinePayload) =>
  putCartLineAndFetchProducts(payload);

export const decreaseCartLineAndFetchProducts = (payload: CartLinePayload) =>
  removeCartLineAndFetchProducts(payload);

export const removeCartItemAndFetchProducts = async (payload: CartLineRequest) => {
  await cartService.removeItem(payload);
  return fetchAndStoreServerCartWithProducts();
};
