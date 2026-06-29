import type { DeliveryCheckoutForm } from '@/core/types';

const CHECKOUT_DELIVERY_KEY = 'checkoutDelivery';

export const checkoutStorage = {
  getDelivery(): DeliveryCheckoutForm | null {
    const raw = sessionStorage.getItem(CHECKOUT_DELIVERY_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as DeliveryCheckoutForm;
    } catch {
      sessionStorage.removeItem(CHECKOUT_DELIVERY_KEY);
      return null;
    }
  },
  setDelivery(form: DeliveryCheckoutForm) {
    sessionStorage.setItem(CHECKOUT_DELIVERY_KEY, JSON.stringify(form));
  },
  clearDelivery() {
    sessionStorage.removeItem(CHECKOUT_DELIVERY_KEY);
  },
};
