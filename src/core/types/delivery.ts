import type { ISelectOption } from './select';

export type DeliveryMethod = 'courier' | 'nova' | 'ukr' | 'dhl';
export type CheckoutPaymentMethod = 'receipt' | 'online';
export type OnlinePaymentType = 'card' | 'gpay' | 'apay';

export type DeliveryOptionConfig = {
  id: DeliveryMethod;
  title: string;
  price: number;
};

export type RecipientForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  region: string;
};

export type BranchSelectionMap = Record<DeliveryMethod, string>;
export type DeliveryBranchesMap = Record<DeliveryMethod, ISelectOption[]>;

export type DeliveryCheckoutForm = {
  recipient: RecipientForm;
  delivery: {
    method: DeliveryMethod;
    branchByMethod: BranchSelectionMap;
  };
  payment: {
    method: CheckoutPaymentMethod;
    onlinePayment: OnlinePaymentType;
  };
};

export type DeliveryCheckoutPayload = {
  recipient: RecipientForm;
  deliveryMethod: DeliveryMethod;
  branchId: string;
  paymentMethod: CheckoutPaymentMethod;
  onlinePayment?: OnlinePaymentType;
};
