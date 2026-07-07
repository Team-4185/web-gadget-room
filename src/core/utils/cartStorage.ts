import type { ICartDto } from '@/core/types';

const CART_KEY = 'cart';

export const cartStorage = {
  get(): ICartDto | null {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as ICartDto;
    } catch {
      localStorage.removeItem(CART_KEY);
      return null;
    }
  },
  set(cart: ICartDto) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  },
  clear() {
    localStorage.removeItem(CART_KEY);
  },
};
