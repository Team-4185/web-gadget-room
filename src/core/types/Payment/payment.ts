export type PaymentMethod = 'card' | 'paypal';

export type MonthOption = {
  id: number;
  value: string;
  name: string;
};

export type PaymentFieldIds = {
  cardNumber: string;
  nameOnCard: string;
};

export type PaymentMethodConfig = {
  method: PaymentMethod;
  title: string;
  iconCount: number;
  className: string;
  ids: PaymentFieldIds;
};

export type PaymentFieldsKey = 'cardNumber' | 'nameOnCard' | 'month' | 'year' | 'cvv';

export type PaymentMethodFormValues = Record<PaymentFieldsKey, string>;

export type PaymentFormValues = Record<PaymentMethod, PaymentMethodFormValues>;

export type PaymentFormErrors = {
  card: Partial<Record<PaymentFieldsKey, string>>;
  paypal: Partial<Record<PaymentFieldsKey, string>>;
};

export type SetField = (method: PaymentMethod, field: PaymentFieldsKey, value: string) => void;
