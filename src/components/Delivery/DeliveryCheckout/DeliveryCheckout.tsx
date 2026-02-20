import { useState } from 'react';
import { Typography } from '@mui/material';

import { OrderSummary } from '@/components';
import { DeliveryMethodSection } from '../DeliveryMethodSection/DeliveryMethodSection';
import { PaymentSection } from '../PaymentSection/PaymentSection';
import { RecipientSection } from '../RecipientSection/RecipientSection';

import './DeliveryCheckout.css';

type DeliveryMethod = 'courier' | 'nova' | 'ukr' | 'dhl';
type PaymentMethod = 'receipt' | 'online';
type OnlinePaymentType = 'card' | 'gpay' | 'apay';

const courierBranches = [
  'Select the appropriate branch',
  'Courier hub #1, Kyiv',
  'Courier hub #3, Kyiv',
  'Courier hub #8, Kyiv',
];

const novaBranches = [
  'Select the appropriate branch',
  'Nova Poshta #104, Kyiv',
  'Nova Poshta #17, Kyiv',
  'Nova Poshta #9, Kyiv',
];

const ukrBranches = [
  'Select the appropriate branch',
  'Ukr Poshta #22, Kyiv',
  'Ukr Poshta #49, Kyiv',
  'Ukr Poshta #103, Kyiv',
];

const dhlBranches = [
  'Select the appropriate branch',
  'DHL Service Point #2, Kyiv',
  'DHL Service Point #5, Kyiv',
  'DHL Service Point #11, Kyiv',
];

const branchesByMethod: Record<DeliveryMethod, string[]> = {
  courier: courierBranches,
  nova: novaBranches,
  ukr: ukrBranches,
  dhl: dhlBranches,
};

export const DeliveryCheckout = () => {
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('nova');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('online');
  const [onlinePayment, setOnlinePayment] = useState<OnlinePaymentType>('card');
  const [branchByMethod, setBranchByMethod] = useState<Record<DeliveryMethod, string>>({
    courier: courierBranches[0],
    nova: novaBranches[0],
    ukr: ukrBranches[0],
    dhl: dhlBranches[0],
  });

  const handleBranchChange = (method: DeliveryMethod, branch: string) => {
    setBranchByMethod((prev) => ({ ...prev, [method]: branch }));
  };

  return (
    <section className="delivery-checkout">
      <div className="delivery-checkout__layout">
        <div className="delivery-checkout__left">
          <Typography variant="h4" component="h1" sx={{ fontSize: '40px', fontWeight: 600 }}>
            Delivery
          </Typography>

          <RecipientSection />

          <DeliveryMethodSection
            deliveryMethod={deliveryMethod}
            onDeliveryMethodChange={setDeliveryMethod}
            branchByMethod={branchByMethod}
            onBranchChange={handleBranchChange}
            branchesByMethod={branchesByMethod}
          />

          <PaymentSection
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
            onlinePayment={onlinePayment}
            onOnlinePaymentChange={setOnlinePayment}
          />
        </div>

        <div className="delivery-checkout__right">
          <OrderSummary
            className="delivery-checkout__summary"
            continueTo="/payment"
            shippingAmount={11}
          />
        </div>
      </div>
    </section>
  );
};
