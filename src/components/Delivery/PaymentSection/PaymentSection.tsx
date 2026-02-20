import { Typography } from '@mui/material';

import { RadioButton } from '@/components';
import { ApplePay, GooglePay, MasterCard, Visa } from '@/assets';

import './PaymentSection.css';

type PaymentMethod = 'receipt' | 'online';
type OnlinePaymentType = 'card' | 'gpay' | 'apay';

type PaymentSectionProps = {
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  onlinePayment: OnlinePaymentType;
  onOnlinePaymentChange: (method: OnlinePaymentType) => void;
};

export const PaymentSection = ({
  paymentMethod,
  onPaymentMethodChange,
  onlinePayment,
  onOnlinePaymentChange,
}: PaymentSectionProps) => {
  return (
    <div className="payment-section">
      <Typography variant="h6" component="h2" sx={{ fontSize: '24px', fontWeight: 600 }}>
        Payment
      </Typography>

      <div className="payment-section__options">
        <div className="payment-section__option payment-section__option--expanded">
          <button
            type="button"
            className="payment-section__option-header"
            onClick={() => onPaymentMethodChange('receipt')}
          >
            <div className="payment-section__option-left">
              <RadioButton checked={paymentMethod === 'receipt'} />
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Payment upon receipt of goods
              </Typography>
            </div>
          </button>
        </div>

        <div className="payment-section__option payment-section__option--expanded">
          <button
            type="button"
            className="payment-section__option-header"
            onClick={() => onPaymentMethodChange('online')}
          >
            <div className="payment-section__option-left">
              <RadioButton checked={paymentMethod === 'online'} />
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Online payment
              </Typography>
            </div>
          </button>

          {paymentMethod === 'online' && (
            <div className="payment-section__payment-list">
              <button
                type="button"
                className="payment-section__payment-item"
                onClick={() => onOnlinePaymentChange('card')}
              >
                <div className="payment-section__option-left">
                  <RadioButton checked={onlinePayment === 'card'} />
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    By card online
                  </Typography>
                </div>
                <div className="payment-section__payment-icons">
                  <Visa width={20} height={15} />
                  <MasterCard width={20} height={20} />
                </div>
              </button>

              <button
                type="button"
                className="payment-section__payment-item"
                onClick={() => onOnlinePaymentChange('gpay')}
              >
                <div className="payment-section__option-left">
                  <RadioButton checked={onlinePayment === 'gpay'} />
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    Google Pay
                  </Typography>
                </div>
                <GooglePay width={24} height={15} />
              </button>

              <button
                type="button"
                className="payment-section__payment-item"
                onClick={() => onOnlinePaymentChange('apay')}
              >
                <div className="payment-section__option-left">
                  <RadioButton checked={onlinePayment === 'apay'} />
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    Apple Pay
                  </Typography>
                </div>
                <ApplePay width={23} height={23} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
