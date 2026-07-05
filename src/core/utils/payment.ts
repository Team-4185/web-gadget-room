import type { FieldError } from 'react-hook-form';

import type {
  CardPaymentForm,
  CardPaymentFormErrors,
  OrderPaymentDetailsPayload,
} from '@/core/types';

export const onlyDigits = (value: string) => value.replace(/\D/g, '');

export const formatCardNumber = (value: string) => {
  const digits = onlyDigits(value).slice(0, 19); // до 19 цифр (AmEx/другие)
  return digits.replace(/(.{4})/g, '$1 ').trim();
};

export const formatCvv = (value: string) => onlyDigits(value).slice(0, 4);

export const isValidCvv = (cvv: string) => {
  const len = cvv.length;
  return len === 3 || len === 4;
};

export const isValidMonth = (month: string) => month.trim().length > 0;

export const isValidYear = (year: string) => year.trim().length > 0;

export const isValidName = (name: string) => name.trim().length >= 2;

export const isValidCardNumber = (cardNumber: string) => {
  const digits = onlyDigits(cardNumber);
  return digits.length >= 12 && digits.length <= 19;
};

export const INITIAL_CARD_PAYMENT_FORM: CardPaymentForm = {
  cardHoldName: '',
  cardNumber: '',
  expiry: '',
  cardCvv: '',
};

export const toPaymentFieldError = (message?: string): FieldError | undefined =>
  message ? { type: 'manual', message } : undefined;

export const formatExpiry = (value: string) => {
  const digits = onlyDigits(value).slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

export const formatPaymentField = (field: keyof CardPaymentForm, value: string) => {
  if (field === 'cardNumber') return formatCardNumber(value);
  if (field === 'expiry') return formatExpiry(value);
  if (field === 'cardCvv') return formatCvv(value);
  return value;
};

export const parseExpiry = (value: string) => {
  const [month, year] = value.split('/');
  const parsedMonth = Number(month);
  const parsedYear = Number(year);

  return {
    month: parsedMonth,
    year: Number.isFinite(parsedYear) ? 2000 + parsedYear : Number.NaN,
  };
};

export const validateCardPaymentForm = (form: CardPaymentForm): CardPaymentFormErrors => {
  const errors: CardPaymentFormErrors = {};
  const cardNumber = onlyDigits(form.cardNumber);
  const cvv = onlyDigits(form.cardCvv);
  const { month, year } = parseExpiry(form.expiry);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  if (!/^[a-zA-Z ]{2,26}$/.test(form.cardHoldName.trim())) {
    errors.cardHoldName = 'Use 2-26 Latin letters';
  }

  if (!isValidCardNumber(cardNumber)) {
    errors.cardNumber = 'Enter a valid card number';
  }

  if (!Number.isInteger(month) || month < 1 || month > 12 || !Number.isInteger(year)) {
    errors.expiry = 'Use MM/YY';
  } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
    errors.expiry = 'Card has expired';
  }

  if (!isValidCvv(cvv)) {
    errors.cardCvv = 'Enter CVV';
  }

  return errors;
};

export const createPaymentDetails = (form: CardPaymentForm): OrderPaymentDetailsPayload => {
  const { month, year } = parseExpiry(form.expiry);

  return {
    cardHoldName: form.cardHoldName.trim(),
    cardNumber: onlyDigits(form.cardNumber),
    cardMonthExpiration: month,
    cardYearExpiration: year,
    cardCvv: onlyDigits(form.cardCvv),
  };
};

export const formatCardPreview = (cardNumber: string) => {
  const digits = onlyDigits(cardNumber).padEnd(16, '0').slice(0, 16);
  return [digits.slice(0, 4), digits.slice(4, 8), digits.slice(8, 12), digits.slice(12, 16)];
};
