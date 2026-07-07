import type { DeliveryOptionConfig, OrderPaymentDetailsPayload } from '@/core/types';

export const DELIVERY_OPTIONS: DeliveryOptionConfig[] = [
  { id: 'courier', title: 'Courier to your address', price: 11 },
  { id: 'nova', title: 'Self-pickup from the Nova Post', price: 11 },
  { id: 'ukr', title: 'Self-pickup from the Ukr Post', price: 5 },
];
export const MOCK_CARD_PAYMENT_DETAILS: OrderPaymentDetailsPayload = {
  cardHoldName: 'Mock Customer',
  cardNumber: '4111111111111111',
  cardMonthExpiration: 12,
  cardYearExpiration: 2030,
  cardCvv: '123',
};
