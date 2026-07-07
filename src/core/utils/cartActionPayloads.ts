import type { CartProductPayload } from './cartLocalState';

export type AddProductArg = {
  product: CartProductPayload;
  showConfirmation?: boolean;
};

export const normalizeAddProductArg = (payload: CartProductPayload | AddProductArg) =>
  typeof payload === 'object' && 'product' in payload
    ? payload
    : { product: payload, showConfirmation: true };
