import type { DeliveryCheckoutForm } from '@/core/types';

export const INITIAL_DELIVERY_CHECKOUT_FORM: DeliveryCheckoutForm = {
  recipient: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    region: '',
  },
  delivery: {
    method: 'nova',
    branchByMethod: {
      courier: '',
      nova: '',
      ukr: '',
      dhl: '',
    },
    courierAddress: {
      street: '',
      houseNumber: '',
      apartmentNumber: '',
      city: '',
      country: 'Ukraine',
      zipCode: '',
    },
  },
  payment: {
    method: 'online',
    onlinePayment: 'card',
  },
};
