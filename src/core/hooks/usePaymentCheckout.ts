import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';

import { DELIVERY_OPTIONS } from '@/core/constants';
import { ordersService } from '@/core/services';
import {
  cartActions,
  selectCartProducts,
  selectCartTotalAmount,
  useAppDispatch,
  useAppSelector,
} from '@/core/store';
import type { CardPaymentForm, CardPaymentFormErrors } from '@/core/types';
import {
  cartStorage,
  checkoutStorage,
  createCheckoutPayloadFromDeliveryAndPayment,
  createPaymentDetails,
  formatCardPreview,
  formatPaymentField,
  INITIAL_CARD_PAYMENT_FORM,
  toErrorMessage,
  validateCardPaymentForm,
} from '@/core/utils';

export const usePaymentCheckout = () => {
  const [form, setForm] = useState<CardPaymentForm>(INITIAL_CARD_PAYMENT_FORM);
  const [errors, setErrors] = useState<CardPaymentFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const deliveryForm = useMemo(() => checkoutStorage.getDelivery(), []);
  const cartProducts = useAppSelector(selectCartProducts);
  const totalAmount = useAppSelector(selectCartTotalAmount);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const selectedDeliveryPrice =
    DELIVERY_OPTIONS.find((option) => option.id === deliveryForm?.delivery.method)?.price ?? 0;

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

  const setField = (field: keyof CardPaymentForm) => (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setErrors((prev) => ({ ...prev, [field]: undefined }));

    setForm((prev) => ({
      ...prev,
      [field]: formatPaymentField(field, value),
    }));
  };

  const placeOrder = async (event?: FormEvent) => {
    event?.preventDefault();

    if (!deliveryForm) return;

    const nextErrors = validateCardPaymentForm(form);

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

  return {
    form,
    errors,
    isSubmitting,
    deliveryForm,
    totalAmount,
    selectedDeliveryPrice,
    cardPreviewNumbers,
    setField,
    placeOrder,
  };
};
