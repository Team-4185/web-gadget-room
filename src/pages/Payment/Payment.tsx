import { Container, Typography } from '@mui/material';
import { Navigate } from 'react-router';

import { OrderSummary, PaymentCardForm, PaymentCardPreview } from '@/components';
import { usePaymentCheckout } from '@/core/hooks';

import './Payment.css';

export const Payment = () => {
  const {
    form,
    errors,
    isSubmitting,
    deliveryForm,
    totalAmount,
    selectedDeliveryPrice,
    cardPreviewNumbers,
    setField,
    placeOrder,
  } = usePaymentCheckout();

  if (!totalAmount) {
    return <Navigate to="/empty-cart" replace />;
  }

  if (!deliveryForm) {
    return <Navigate to="/delivery" replace />;
  }

  return (
    <section className="payment-page">
      <Container disableGutters>
        <div className="payment-page__layout">
          <form className="payment-page__form" onSubmit={placeOrder}>
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

            <PaymentCardPreview
              cardHolderName={form.cardHoldName}
              numberGroups={cardPreviewNumbers}
            />
            <PaymentCardForm form={form} errors={errors} setField={setField} />
          </form>

          <div className="payment-page__right">
            <OrderSummary
              className="payment-page__summary"
              onContinue={() => void placeOrder()}
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
