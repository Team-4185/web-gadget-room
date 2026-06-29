import type { ISelectOption } from './select';

export type DeliveryMethod = 'courier' | 'nova' | 'ukr' | 'dhl';
export type CheckoutPaymentMethod = 'receipt' | 'online';
export type OnlinePaymentType = 'card' | 'gpay' | 'apay';

export type DeliveryOptionConfig = {
  id: DeliveryMethod;
  title: string;
  price: number;
};

export type DeliveryBranchProvider = 'NOVA_POSHTA' | 'UKR_POSHTA';

export type DeliveryBranchSource = 'osm' | 'fallback';

export type DeliveryMapBounds = [[number, number], [number, number]];

export type DeliveryRegionMapConfig = {
  value: string;
  name: string;
  center: [number, number];
  bounds: DeliveryMapBounds;
};

export type DeliveryBranchOption = ISelectOption & {
  fullName?: string;
  provider: DeliveryBranchProvider;
  city?: string;
  address?: string;
  lat?: number;
  lon?: number;
  source: DeliveryBranchSource;
};

export type RecipientForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  region: string;
};

export type CourierAddressForm = {
  street: string;
  houseNumber: string;
  apartmentNumber: string;
  city: string;
  country: string;
  zipCode: string;
};

export type BranchSelectionMap = Record<DeliveryMethod, string>;
export type DeliveryBranchesMap = Record<DeliveryMethod, DeliveryBranchOption[]>;
export type DeliveryCheckoutErrors = {
  recipient?: Partial<Record<keyof RecipientForm, string>>;
  delivery?: {
    branchByMethod?: Partial<Record<DeliveryMethod, string>>;
    courierAddress?: Partial<Record<keyof CourierAddressForm, string>>;
  };
  cart?: string;
};

export type DeliveryCheckoutForm = {
  recipient: RecipientForm;
  delivery: {
    method: DeliveryMethod;
    branchByMethod: BranchSelectionMap;
    courierAddress: CourierAddressForm;
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
