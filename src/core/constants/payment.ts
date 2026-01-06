import type { MonthOption, PaymentMethodConfig } from '@/core/types/payment';

export const MONTHS: MonthOption[] = [
  { id: 1, value: 'december', name: 'December' },
  { id: 2, value: 'january', name: 'January' },
  { id: 3, value: 'february', name: 'February' },
  { id: 4, value: 'march', name: 'March' },
  { id: 5, value: 'april', name: 'April' },
  { id: 6, value: 'may', name: 'May' },
  { id: 7, value: 'june', name: 'June' },
  { id: 8, value: 'july', name: 'July' },
  { id: 9, value: 'august', name: 'August' },
  { id: 10, value: 'september', name: 'September' },
  { id: 11, value: 'october', name: 'October' },
  { id: 12, value: 'november', name: 'November' },
];

export const PAYMENT_METHODS: PaymentMethodConfig[] = [
  {
    method: 'card',
    title: 'Credit Card',
    iconCount: 3,
    className: 'accordion credit-card',
    ids: { cardNumber: 'cardNumber', nameOnCard: 'nameOnCard' },
  },
  {
    method: 'paypal',
    title: 'Paypal',
    iconCount: 1,
    className: 'accordion paypal',
    ids: { cardNumber: 'paypalCardNumber', nameOnCard: 'paypalNameOnCard' },
  },
];
