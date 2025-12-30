import { useMemo, useState } from 'react';
import type { PaymentMethod, PaymentFormErrors } from '../../types/Payment/payment';
import {
  formatCardNumber,
  formatCvv,
  isValidCardNumber,
  isValidCvv,
  isValidMonth,
  isValidName,
  isValidYear,
  onlyDigits,
} from '../../utils/payment';

type PaymentFormValues = {
  card: {
    cardNumber: string;
    nameOnCard: string;
    month: string;
    year: string;
    cvv: string;
  };
  paypal: {
    cardNumber: string;
    nameOnCard: string;
    month: string;
    year: string;
    cvv: string;
  };
};

const EMPTY_METHOD = {
  cardNumber: '',
  nameOnCard: '',
  month: '',
  year: '',
  cvv: '',
};

export const usePaymentForm = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');

  const [values, setValues] = useState<PaymentFormValues>({
    card: { ...EMPTY_METHOD },
    paypal: { ...EMPTY_METHOD },
  });

  const [errors, setErrors] = useState<PaymentFormErrors>({
    card: {},
    paypal: {},
  });

  const methodValues = values[selectedMethod];
  const methodErrors = errors[selectedMethod] ?? {};

  const setField = (
    method: PaymentMethod,
    field: keyof PaymentFormValues['card'],
    rawValue: string
  ) => {
    setValues((prev) => {
      let nextValue = rawValue;

      if (field === 'cardNumber') nextValue = formatCardNumber(rawValue);
      if (field === 'cvv') nextValue = formatCvv(rawValue);

      return {
        ...prev,
        [method]: {
          ...prev[method],
          [field]: nextValue,
        },
      };
    });

    setErrors((prev) => {
      const methodErr = prev[method] ?? {};
      if (!methodErr[field]) return prev;

      const { [field]: _, ...rest } = methodErr;
      return { ...prev, [method]: rest };
    });
  };

  const validateMethod = (method: PaymentMethod) => {
    const v = values[method];

    const next: Record<string, string> = {};

    if (!isValidCardNumber(v.cardNumber)) next.cardNumber = 'Enter a valid card number';
    if (!isValidName(v.nameOnCard)) next.nameOnCard = 'Enter name on card';
    if (!isValidMonth(v.month)) next.month = 'Select month';
    if (!isValidYear(v.year)) next.year = 'Select year';
    if (!isValidCvv(v.cvv)) next.cvv = 'CVV must be 3–4 digits';

    setErrors((prev) => ({ ...prev, [method]: next }));

    return Object.keys(next).length === 0;
  };

  const validateSelected = () => validateMethod(selectedMethod);

  const payload = useMemo(() => {
    const v = values[selectedMethod];
    return {
      method: selectedMethod,
      cardNumber: onlyDigits(v.cardNumber),
      nameOnCard: v.nameOnCard.trim(),
      month: v.month,
      year: v.year,
      cvv: v.cvv,
    };
  }, [selectedMethod, values]);

  return {
    selectedMethod,
    setSelectedMethod,

    values,
    errors,

    methodValues,
    methodErrors,

    setField,
    validateSelected,
    payload,
  };
};
