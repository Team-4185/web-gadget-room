import { Typography } from '@mui/material';

import {
  OrderSummary,
  DeliveryMethodSection,
  PaymentSection,
  RecipientSection,
} from '@/components';
import { SmallRobots } from '@/assets';
import { DELIVERY_BRANCHES_BY_METHOD, DELIVERY_OPTIONS } from '@/core/constants';
import { useDeliveryCheckout } from '@/core/hooks';

import './DeliveryCheckout.css';

export const DeliveryCheckout = () => {
  const {
    form,
    validationErrors,
    isSubmitting,
    selectedDeliveryPrice,
    isOnlinePayment,
    handleRecipientChange,
    handleDeliveryMethodChange,
    handleBranchChange,
    handleCourierAddressChange,
    handlePaymentMethodChange,
    handleOnlinePaymentChange,
    handleContinueToPayment,
    handlePlaceOrder,
  } = useDeliveryCheckout();

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
          region={form.recipient.region}
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
          onContinue={isOnlinePayment ? handleContinueToPayment : () => void handlePlaceOrder()}
          continueLabel={
            isSubmitting ? 'placing order' : isOnlinePayment ? 'continue to payment' : 'place order'
          }
          continueDisabled={isSubmitting}
          shippingAmount={selectedDeliveryPrice}
        />
        <SmallRobots width={572} height={412} />
      </div>
    </div>
  );
};
