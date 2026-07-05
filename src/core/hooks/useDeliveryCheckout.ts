import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';

import { DELIVERY_OPTIONS, INITIAL_DELIVERY_CHECKOUT_FORM } from '@/core/constants';
import { cartService, ordersService, usersService } from '@/core/services';
import { cartActions, selectCartProducts, useAppDispatch, useAppSelector } from '@/core/store';
import type {
  CheckoutPaymentMethod,
  CourierAddressForm,
  DeliveryCheckoutErrors,
  DeliveryCheckoutForm,
  DeliveryMethod,
  OnlinePaymentType,
  RecipientForm,
} from '@/core/types';
import {
  cartStorage,
  checkoutStorage,
  createCheckoutPayloadFromDeliveryAndPayment,
  getDeliveryCheckoutValidationMessage,
  mapProductsToCheckoutItems,
  toErrorMessage,
  validateDeliveryCheckout,
} from '@/core/utils';

export const useDeliveryCheckout = () => {
  const [form, setForm] = useState<DeliveryCheckoutForm>(INITIAL_DELIVERY_CHECKOUT_FORM);
  const [validationErrors, setValidationErrors] = useState<DeliveryCheckoutErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cartProducts = useAppSelector(selectCartProducts);
  const userId = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const selectedDeliveryPrice =
    DELIVERY_OPTIONS.find((option) => option.id === form.delivery.method)?.price ?? 0;
  const cartItems = mapProductsToCheckoutItems(
    cartProducts.map((product) => ({
      ...product,
      phoneId: product.id,
      variantId: product.selectedVariantId,
    }))
  );

  useEffect(() => {
    if (!userId) return;

    const controller = new AbortController();

    usersService
      .getCurrentUser(controller.signal)
      .then((user) => {
        if (controller.signal.aborted) return;

        setForm((prev) => ({
          ...prev,
          recipient: {
            ...prev.recipient,
            firstName: prev.recipient.firstName || user.firstName || '',
            lastName: prev.recipient.lastName || user.lastName || '',
            email: prev.recipient.email || user.email || '',
            phone: prev.recipient.phone || user.phoneNumber || '',
          },
        }));
      })
      .catch(() => {
        if (controller.signal.aborted) return;
      });

    return () => {
      controller.abort();
    };
  }, [userId]);

  const handleRecipientChange = (field: keyof RecipientForm, value: string) => {
    setValidationErrors({});
    setForm((prev) => ({
      ...prev,
      recipient: {
        ...prev.recipient,
        [field]: value,
      },
      ...(field === 'region' && {
        delivery: {
          ...prev.delivery,
          branchByMethod: {
            ...prev.delivery.branchByMethod,
            nova: '',
            ukr: '',
          },
        },
      }),
    }));
  };

  const handleDeliveryMethodChange = (method: DeliveryMethod) => {
    setValidationErrors({});
    setForm((prev) => ({
      ...prev,
      delivery: {
        ...prev.delivery,
        method,
      },
    }));
  };

  const handleBranchChange = (method: DeliveryMethod, branch: string) => {
    setValidationErrors({});
    setForm((prev) => ({
      ...prev,
      delivery: {
        ...prev.delivery,
        branchByMethod: {
          ...prev.delivery.branchByMethod,
          [method]: branch,
        },
      },
    }));
  };

  const handleCourierAddressChange = (field: keyof CourierAddressForm, value: string) => {
    setValidationErrors({});
    setForm((prev) => ({
      ...prev,
      delivery: {
        ...prev.delivery,
        courierAddress: {
          ...prev.delivery.courierAddress,
          [field]: value,
        },
      },
    }));
  };

  const handlePaymentMethodChange = (method: CheckoutPaymentMethod) => {
    setValidationErrors({});
    setForm((prev) => ({
      ...prev,
      payment: {
        ...prev.payment,
        method,
      },
    }));
  };

  const handleOnlinePaymentChange = (onlinePayment: OnlinePaymentType) => {
    setValidationErrors({});
    setForm((prev) => ({
      ...prev,
      payment: {
        ...prev.payment,
        onlinePayment,
      },
    }));
  };

  const validateCheckoutDetails = () => {
    const nextValidationErrors = validateDeliveryCheckout(form, cartItems);
    const validationError = getDeliveryCheckoutValidationMessage(nextValidationErrors);

    if (validationError) {
      setValidationErrors(nextValidationErrors);
      enqueueSnackbar(validationError, { variant: 'error' });
      return false;
    }

    return true;
  };

  const handleContinueToPayment = () => {
    if (!validateCheckoutDetails()) return;

    checkoutStorage.setDelivery(form);
    navigate('/payment');
  };

  const handlePlaceOrder = async () => {
    if (!validateCheckoutDetails()) return;

    setIsSubmitting(true);

    try {
      const order = await ordersService.checkout(
        createCheckoutPayloadFromDeliveryAndPayment(form, cartItems)
      );

      await cartService.clearCart();
      cartStorage.clear();
      checkoutStorage.clearDelivery();
      dispatch(cartActions.clearCartLocal());
      enqueueSnackbar(`Order #${order.id} has been placed.`, { variant: 'success' });
      navigate('/home');
    } catch (error) {
      enqueueSnackbar(toErrorMessage(error, 'Failed to place order.'), { variant: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    validationErrors,
    isSubmitting,
    selectedDeliveryPrice,
    isOnlinePayment: form.payment.method === 'online',
    handleRecipientChange,
    handleDeliveryMethodChange,
    handleBranchChange,
    handleCourierAddressChange,
    handlePaymentMethodChange,
    handleOnlinePaymentChange,
    handleContinueToPayment,
    handlePlaceOrder,
  };
};
