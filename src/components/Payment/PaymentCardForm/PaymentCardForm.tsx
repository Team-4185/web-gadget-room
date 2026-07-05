import type { ChangeEvent } from 'react';

import { Input } from '@/components';
import type { CardPaymentForm, CardPaymentFormErrors } from '@/core/types';
import { toPaymentFieldError } from '@/core/utils';

type PaymentCardFormProps = {
  form: CardPaymentForm;
  errors: CardPaymentFormErrors;
  setField: (field: keyof CardPaymentForm) => (event: ChangeEvent<HTMLInputElement>) => void;
};

export const PaymentCardForm = ({ form, errors, setField }: PaymentCardFormProps) => (
  <div className="payment-page__fields">
    <Input
      label="Cardholder Name"
      value={form.cardHoldName}
      onChange={setField('cardHoldName')}
      error={toPaymentFieldError(errors.cardHoldName)}
      autoComplete="cc-name"
    />
    <Input
      label="Card Number"
      value={form.cardNumber}
      onChange={setField('cardNumber')}
      error={toPaymentFieldError(errors.cardNumber)}
      autoComplete="cc-number"
    />
    <div className="payment-page__field-row">
      <Input
        label="MM/YY"
        value={form.expiry}
        onChange={setField('expiry')}
        error={toPaymentFieldError(errors.expiry)}
        autoComplete="cc-exp"
      />
      <Input
        label="CVV"
        value={form.cardCvv}
        onChange={setField('cardCvv')}
        error={toPaymentFieldError(errors.cardCvv)}
        autoComplete="cc-csc"
      />
    </div>
  </div>
);
