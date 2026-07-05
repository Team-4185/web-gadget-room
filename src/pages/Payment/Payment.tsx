import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { Container, Typography } from '@mui/material';
import type { FieldError } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';

import { MasterCard } from '@/assets';
import { Input, OrderSummary } from '@/components';
import { cartActions, useAppDispatch, useAppSelector } from '@/core/store';
import { DELIVERY_OPTIONS } from '@/core/constants';
import {
  cartStorage,
  checkoutStorage,
  createCheckoutPayloadFromDeliveryAndPayment,
  formatCardNumber,
  formatCvv,
  isValidCardNumber,
  isValidCvv,
  onlyDigits,
  toErrorMessage,
} from '@/core/utils';
import { ordersService } from '@/core/services';
import type { OrderPaymentDetailsPayload } from '@/core/types';

import './Payment.css';

type PaymentForm = {
  cardHoldName: string;
  cardNumber: string;
  expiry: string;
  cardCvv: string;
};

type PaymentFormErrors = Partial<Record<keyof PaymentForm, string>>;

const toFieldError = (message?: string): FieldError | undefined =>
  message ? { type: 'manual', message } : undefined;

const formatExpiry = (value: string) => {
  const digits = onlyDigits(value).slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

const parseExpiry = (value: string) => {
  const [month, year] = value.split('/');
  const parsedMonth = Number(month);
  const parsedYear = Number(year);

  return {
    month: parsedMonth,
    year: Number.isFinite(parsedYear) ? 2000 + parsedYear : Number.NaN,
  };
};

const validatePaymentForm = (form: PaymentForm): PaymentFormErrors => {
  const errors: PaymentFormErrors = {};
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

const createPaymentDetails = (form: PaymentForm): OrderPaymentDetailsPayload => {
  const { month, year } = parseExpiry(form.expiry);

  return {
    cardHoldName: form.cardHoldName.trim(),
    cardNumber: onlyDigits(form.cardNumber),
    cardMonthExpiration: month,
    cardYearExpiration: year,
    cardCvv: onlyDigits(form.cardCvv),
  };
};

const formatCardPreview = (cardNumber: string) => {
  const digits = onlyDigits(cardNumber).padEnd(16, '0').slice(0, 16);
  return [digits.slice(0, 4), digits.slice(4, 8), digits.slice(8, 12), digits.slice(12, 16)];
};

export const Payment = () => {
  const [form, setForm] = useState<PaymentForm>({
    cardHoldName: '',
    cardNumber: '',
    expiry: '',
    cardCvv: '',
  });
  const [errors, setErrors] = useState<PaymentFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const deliveryForm = useMemo(() => checkoutStorage.getDelivery(), []);
  const cartProducts = useAppSelector((state) => state.cart.cart);
  const totalAmount = useAppSelector((state) => state.cart.totalAmount);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  if (!totalAmount) {
    return <Navigate to="/empty-cart" replace />;
  }

  if (!deliveryForm) {
    return <Navigate to="/delivery" replace />;
  }

  const selectedDeliveryPrice =
    DELIVERY_OPTIONS.find((option) => option.id === deliveryForm.delivery.method)?.price ?? 0;

  const cartItems = cartProducts.map((product) => ({
    phoneId: product.id,
    variantId: product.selectedVariantId,
    amount: product.amount,
    selectedColor: product.selectedColor,
    selectedStorage: product.selectedStorage,
    colors: product.colors,
    storageCapacity: product.storageCapacity,
  }));

  const cardPreviewNumbers = formatCardPreview(form.cardNumber);

  const setField = (field: keyof PaymentForm) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setErrors((prev) => ({ ...prev, [field]: undefined }));

    setForm((prev) => ({
      ...prev,
      [field]:
        field === 'cardNumber'
          ? formatCardNumber(value)
          : field === 'expiry'
            ? formatExpiry(value)
            : field === 'cardCvv'
              ? formatCvv(value)
              : value,
    }));
  };

  const handleSubmit = async (event?: FormEvent) => {
    event?.preventDefault();

    const nextErrors = validatePaymentForm(form);

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      enqueueSnackbar('Please fix the highlighted payment fields.', { variant: 'error' });
      return;
    }

    setIsSubmitting(true);

    try {
      const order = await ordersService.checkout(
        createCheckoutPayloadFromDeliveryAndPayment(
          deliveryForm,
          cartItems,
          createPaymentDetails(form)
        )
      );

      enqueueSnackbar(`Order #${order.id} has been placed.`, { variant: 'success' });
      navigate('/home');
      cartStorage.clear();
      checkoutStorage.clearDelivery();
      dispatch(cartActions.clearCartLocal());
    } catch (error) {
      enqueueSnackbar(toErrorMessage(error, 'Failed to place order.'), { variant: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="payment-page">
      <Container disableGutters>
        <div className="payment-page__layout">
          <form className="payment-page__form" onSubmit={handleSubmit}>
            <Typography component="h1" sx={{ fontSize: '40px', fontWeight: 600 }}>
              Payment
            </Typography>

            <div className="payment-page__tabs" aria-label="Payment method">
              <button className="payment-page__tab is-active" type="button">
                Credit Card
              </button>
              <button className="payment-page__tab" type="button">
                GPay
              </button>
              <button className="payment-page__tab" type="button">
                Apple Pay
              </button>
            </div>

            <div className="payment-card-preview" aria-hidden="true">
              <div className="payment-card-preview__chip" />
              <div className="payment-card-preview__signal" />
              <div className="payment-card-preview__stripes" />
              <div className="payment-card-preview__number">
                {cardPreviewNumbers.map((group, index) => (
                  <span key={`${group}-${index}`}>{group}</span>
                ))}
              </div>
              <div className="payment-card-preview__bottom">
                <span>{form.cardHoldName || 'Cardholder'}</span>
                <MasterCard />
              </div>
            </div>

            <div className="payment-page__fields">
              <Input
                label="Cardholder Name"
                value={form.cardHoldName}
                onChange={setField('cardHoldName')}
                error={toFieldError(errors.cardHoldName)}
                autoComplete="cc-name"
              />
              <Input
                label="Card Number"
                value={form.cardNumber}
                onChange={setField('cardNumber')}
                error={toFieldError(errors.cardNumber)}
                autoComplete="cc-number"
              />
              <div className="payment-page__field-row">
                <Input
                  label="MM/YY"
                  value={form.expiry}
                  onChange={setField('expiry')}
                  error={toFieldError(errors.expiry)}
                  autoComplete="cc-exp"
                />
                <Input
                  label="CVV"
                  value={form.cardCvv}
                  onChange={setField('cardCvv')}
                  error={toFieldError(errors.cardCvv)}
                  autoComplete="cc-csc"
                />
              </div>
            </div>
          </form>

          <div className="payment-page__right">
            <OrderSummary
              className="payment-page__summary"
              onContinue={() => void handleSubmit()}
              continueLabel={isSubmitting ? 'placing order' : 'place order'}
              continueDisabled={isSubmitting}
              shippingAmount={selectedDeliveryPrice}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
