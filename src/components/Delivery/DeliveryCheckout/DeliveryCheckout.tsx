import { useState } from 'react';
import { Typography } from '@mui/material';

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
import type {
  CheckoutPaymentMethod,
  DeliveryCheckoutForm,
  DeliveryMethod,
  OnlinePaymentType,
  RecipientForm,
} from '@/core/types';

import './DeliveryCheckout.css';

export const DeliveryCheckout = () => {
  const [form, setForm] = useState<DeliveryCheckoutForm>(INITIAL_DELIVERY_CHECKOUT_FORM);

  const handleRecipientChange = (field: keyof RecipientForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      recipient: {
        ...prev.recipient,
        [field]: value,
      },
    }));
  };

  const handleDeliveryMethodChange = (method: DeliveryMethod) => {
    setForm((prev) => ({
      ...prev,
      delivery: {
        ...prev.delivery,
        method,
      },
    }));
  };

  const handleBranchChange = (method: DeliveryMethod, branch: string) => {
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

  const handlePaymentMethodChange = (method: CheckoutPaymentMethod) => {
    setForm((prev) => ({
      ...prev,
      payment: {
        ...prev.payment,
        method,
      },
    }));
  };

  const handleOnlinePaymentChange = (onlinePayment: OnlinePaymentType) => {
    setForm((prev) => ({
      ...prev,
      payment: {
        ...prev.payment,
        onlinePayment,
      },
    }));
  };

  return (
    <div className="delivery-checkout__layout">
      <div className="delivery-checkout__left">
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Delivery
        </Typography>

        <RecipientSection recipient={form.recipient} onRecipientChange={handleRecipientChange} />

        <DeliveryMethodSection
          deliveryMethod={form.delivery.method}
          onDeliveryMethodChange={handleDeliveryMethodChange}
          options={DELIVERY_OPTIONS}
          branchByMethod={form.delivery.branchByMethod}
          onBranchChange={handleBranchChange}
          branchesByMethod={DELIVERY_BRANCHES_BY_METHOD}
        />

        <PaymentSection
          paymentMethod={form.payment.method}
          onPaymentMethodChange={handlePaymentMethodChange}
          onlinePayment={form.payment.onlinePayment}
          onOnlinePaymentChange={handleOnlinePaymentChange}
        />
      </div>

      <div className="delivery-checkout__right">
        <OrderSummary className="delivery-checkout__summary" continueTo="/payment" />
        <SmallRobots width={572} height={412} />
      </div>
    </div>
  );
};
