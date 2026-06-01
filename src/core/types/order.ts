import type { ApiPhone } from './product';

export type OrderPaymentMethod = 'CARD' | 'CASH_ON_DELIVERY';
export type OrderDeliveryMethod = 'COURIER' | 'POST_OFFICE' | 'PICKUP';
export type OrderLogisticsCompany = 'NOVA_POSHTA' | 'UKR_POSHTA' | 'DHL';

export type OrderPaymentDetailsPayload = {
  cardHoldName: string;
  cardNumber: string;
  cardMonthExpiration: number;
  cardYearExpiration: number;
  cardCvv: string;
};

export type OrderShippingAddressPayload = {
  apartmentNumber?: string;
  houseNumber?: string;
  logisticsCompany?: OrderLogisticsCompany;
  logisticPostOffice?: string;
  street?: string;
  city?: string;
  region?: string;
  country?: string;
  zipCode?: string;
};

export type OrderItemColor = 'BLACK';
export type OrderItemStorage = 'CAPACITY_128GB';

export type CreateOrderItemPayload = {
  phoneId: number;
  quantity: number;
  color: OrderItemColor;
  storage: OrderItemStorage;
};

export type CheckoutItemSelectionPayload = {
  phoneId: number;
  color: OrderItemColor;
  storage: OrderItemStorage;
};

export type CreateOrderPayload = {
  customerEmail: string;
  customerFirstName: string;
  customerLastName: string;
  customerPhoneNumber: string;
  paymentMethod: OrderPaymentMethod;
  paymentDetails?: OrderPaymentDetailsPayload;
  deliveryMethod: OrderDeliveryMethod;
  shippingAddress: OrderShippingAddressPayload | null;
  items: CreateOrderItemPayload[];
};

export type CheckoutOrderPayload = Omit<CreateOrderPayload, 'items'> & {
  itemSelections: CheckoutItemSelectionPayload[];
};

export type OrderResponseItem = {
  id: number;
  phone: ApiPhone;
  productName: string;
  sku: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
};

export type OrderResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  customerEmail: string;
  customerFirstName: string;
  customerLastName: string;
  customerPhoneNumber: string;
  status: string;
  paymentMethod: OrderPaymentMethod;
  deliveryMethod: OrderDeliveryMethod;
  shippingAddress: OrderShippingAddressPayload | null;
  paymentDetails?: {
    paymentStatus: string;
    transactionId?: string;
  };
  total: number;
  items: OrderResponseItem[];
};
