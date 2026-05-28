import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import {
  OrderSummary,
  DeliveryMethodSection,
  PaymentSection,
  RecipientSection,
} from '@/components';
import { SmallRobots } from '@/assets';
import {
  DELIVERY_BRANCHES_BY_METHOD,
  DELIVERY_OPTIONS,
  INITIAL_DELIVERY_CHECKOUT_FORM,
} from '@/core/constants';
import { cartActions, useAppDispatch, useAppSelector } from '@/core/store';
import { cartService, ordersService } from '@/core/services';
import {
  cartStorage,
  createOrderPayloadFromCheckout,
  getDeliveryCheckoutValidationMessage,
  toErrorMessage,
  validateDeliveryCheckout,
} from '@/core/utils';
import type {
  CheckoutPaymentMethod,
  CourierAddressForm,
  DeliveryCheckoutForm,
  DeliveryCheckoutErrors,
  DeliveryMethod,
  OnlinePaymentType,
  RecipientForm,
} from '@/core/types';

import './DeliveryCheckout.css';

export const DeliveryCheckout = () => {
  const [form, setForm] = useState<DeliveryCheckoutForm>(INITIAL_DELIVERY_CHECKOUT_FORM);
  const [validationErrors, setValidationErrors] = useState<DeliveryCheckoutErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cartProducts = useAppSelector((state) => state.cart.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const selectedDeliveryPrice =
    DELIVERY_OPTIONS.find((option) => option.id === form.delivery.method)?.price ?? 0;
  const cartItems = cartProducts.map((product) => ({
    phoneId: product.id,
    amount: product.amount,
  }));

  const handleRecipientChange = (field: keyof RecipientForm, value: string) => {
    setValidationErrors({});
    setForm((prev) => ({
      ...prev,
      recipient: {
        ...prev.recipient,
        [field]: value,
      },
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

  const handlePlaceOrder = async () => {
    const nextValidationErrors = validateDeliveryCheckout(form, cartItems);
    const validationError = getDeliveryCheckoutValidationMessage(nextValidationErrors);

    if (validationError) {
      setValidationErrors(nextValidationErrors);
      enqueueSnackbar(validationError, { variant: 'error' });
      return;
    }

    setIsSubmitting(true);

    try {
      const order = await ordersService.createOrder(
        createOrderPayloadFromCheckout(form, cartItems)
      );

      await cartService.clearCart();
      cartStorage.clear();
      dispatch(cartActions.clearCartLocal());
      enqueueSnackbar(`Order #${order.id} has been placed.`, { variant: 'success' });
      navigate('/home');
    } catch (error) {
      enqueueSnackbar(toErrorMessage(error, 'Failed to place order.'), { variant: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="delivery-checkout__layout">
      <div className="delivery-checkout__left">
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Delivery
        </Typography>

        <RecipientSection
          recipient={form.recipient}
          errors={validationErrors.recipient}
          onRecipientChange={handleRecipientChange}
        />

        <DeliveryMethodSection
          deliveryMethod={form.delivery.method}
          onDeliveryMethodChange={handleDeliveryMethodChange}
          options={DELIVERY_OPTIONS}
          branchByMethod={form.delivery.branchByMethod}
          errors={validationErrors.delivery}
          onBranchChange={handleBranchChange}
          branchesByMethod={DELIVERY_BRANCHES_BY_METHOD}
          courierAddress={form.delivery.courierAddress}
          onCourierAddressChange={handleCourierAddressChange}
        />

        <PaymentSection
          paymentMethod={form.payment.method}
          onPaymentMethodChange={handlePaymentMethodChange}
          onlinePayment={form.payment.onlinePayment}
          onOnlinePaymentChange={handleOnlinePaymentChange}
        />
      </div>

      <div className="delivery-checkout__right">
        <OrderSummary
          className="delivery-checkout__summary"
          onContinue={handlePlaceOrder}
          continueLabel={isSubmitting ? 'placing order' : 'place order'}
          continueDisabled={isSubmitting}
          shippingAmount={selectedDeliveryPrice}
        />
        <SmallRobots width={572} height={412} />
      </div>
    </div>
  );
};
