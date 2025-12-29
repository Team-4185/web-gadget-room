import { useMemo } from 'react';
import { Box, Container } from '@mui/material';

import { OrderSummary } from '../../components/ui/Cart/OrderSummary';
import { PaymentMethodList } from '../../components/shared/Payment/PaymentMethodList';
import { PAYMENT_METHODS } from '../../core/constants/Payment/payment';
import { usePaymentForm } from '../../core/hooks/Payment/usePaymentForm';

export const Payment = () => {
  const { selectedMethod, setSelectedMethod, values, errors, setField, validateSelected, payload } =
    usePaymentForm();

  const cardYears = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 31 }, (_, i) => currentYear - 20 + i);
  }, []);

  const handleContinuePayment = () => {
    if (!validateSelected()) return;
    console.log('CONTINUE PAYMENT PAYLOAD:', payload);
    // тут дальше: запрос на бэк / создание платежа
  };

  const isContinueDisabled = useMemo(
    () => !Object.values(values[selectedMethod]).every(Boolean),
    [values, selectedMethod]
  );

  return (
    <Container disableGutters maxWidth="xl" className="payment-container">
      <Box className="payment-wrapper">
        <Box className="payment-form">
          <h1 className="payment-title">Payment</h1>
          <span className="payment-subtitle">Choose Payment Method</span>

          <PaymentMethodList
            methods={PAYMENT_METHODS}
            years={cardYears}
            selectedMethod={selectedMethod}
            onSelect={setSelectedMethod}
            values={values}
            errors={errors}
            setField={setField}
          />
        </Box>

        <OrderSummary
          continueLabel="Continue payment"
          onContinue={handleContinuePayment}
          continueDisabled={isContinueDisabled}
        />
      </Box>
    </Container>
  );
};
