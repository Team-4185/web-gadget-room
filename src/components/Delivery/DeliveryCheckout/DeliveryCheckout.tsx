import { useState } from 'react';
import { MenuItem, Typography } from '@mui/material';

import { Button, Input, OrderSummary } from '@/components';
import { ApplePay, GooglePay, Location, MasterCard, NovaPost, Visa } from '@/assets';

import RadioActive from '/icons/RadioActive.svg';
import RadioInactive from '/icons/RadioInactive.svg';

import './DeliveryCheckout.css';

type DeliveryMethod = 'courier' | 'nova' | 'ukr' | 'dhl';
type PaymentMethod = 'receipt' | 'online';
type OnlinePaymentType = 'card' | 'gpay' | 'apay';

const branches = [
  'Select the appropriate branch',
  'Nova Poshta #104, Kyiv',
  'Nova Poshta #17, Kyiv',
  'Nova Poshta #9, Kyiv',
];

export const DeliveryCheckout = () => {
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('nova');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('online');
  const [onlinePayment, setOnlinePayment] = useState<OnlinePaymentType>('card');
  const [branch, setBranch] = useState(branches[0]);

  return (
    <section className="delivery-checkout">
      <div className="delivery-checkout__layout">
        <div className="delivery-checkout__left">
          <Typography variant="h4" component="h1" sx={{ fontSize: '40px', fontWeight: 600 }}>
            Delivery
          </Typography>

          <div className="delivery-checkout__section">
            <Typography variant="h6" component="h2" sx={{ fontSize: '24px', fontWeight: 600 }}>
              Recipient
            </Typography>

            <div className="delivery-checkout__fields">
              <div className="delivery-checkout__row">
                <Input inherit className="delivery-checkout__input" placeholder="First Name" />
                <Input inherit className="delivery-checkout__input" placeholder="Last Name" />
              </div>

              <div className="delivery-checkout__row">
                <Input inherit className="delivery-checkout__input" placeholder="Email" />
                <Input inherit className="delivery-checkout__input" placeholder="Phone" />
              </div>

              <div className="delivery-checkout__address">
                <div className="delivery-checkout__address-left">
                  <Location width={20} height={20} color="var(--amber)" />
                  <Typography variant="body1" component="span" sx={{ fontSize: '14px' }}>
                    Kiev,Kiev region
                  </Typography>
                </div>
                <button className="delivery-checkout__change" type="button">
                  Change
                </button>
              </div>
            </div>
          </div>

          <div className="delivery-checkout__section">
            <Typography variant="h6" component="h2" sx={{ fontSize: '24px', fontWeight: 600 }}>
              Choose a delivery method
            </Typography>

            <div className="delivery-checkout__options">
              <button
                type="button"
                className="delivery-checkout__option"
                onClick={() => setDeliveryMethod('courier')}
              >
                <div className="delivery-checkout__option-left">
                  <img
                    src={deliveryMethod === 'courier' ? RadioActive : RadioInactive}
                    alt="radio"
                  />
                  <Typography variant="body1">Courier to your address</Typography>
                </div>
                <Typography variant="body1" sx={{ fontSize: '15px', fontWeight: 500 }}>
                  {'\u20AC'} 11.00
                </Typography>
              </button>

              <div className="delivery-checkout__option delivery-checkout__option--expanded">
                <button
                  type="button"
                  className="delivery-checkout__option-header"
                  onClick={() => setDeliveryMethod('nova')}
                >
                  <div className="delivery-checkout__option-left">
                    <img
                      src={deliveryMethod === 'nova' ? RadioActive : RadioInactive}
                      alt="radio"
                    />
                    <Typography variant="body1">Self-pickup from the Nova Post</Typography>
                  </div>
                  <Typography variant="body1" sx={{ fontSize: '15px', fontWeight: 500 }}>
                    {'\u20AC'} 11.00
                  </Typography>
                </button>

                <div className="delivery-checkout__option-details">
                  <Input
                    inherit
                    select
                    value={branch}
                    onChange={(e) => setBranch(String(e.target.value))}
                    className="delivery-checkout__branch"
                    size="small"
                  >
                    {branches.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Input>

                  <Button
                    maxWidth="233px"
                    height="44px"
                    textTransform="none"
                    borderRadius="8px"
                    border="none"
                    sx={{
                      boxShadow: 'none',
                      background: 'var(--blue-violet)',
                      color: 'var(--white)',
                      '&:hover': { background: 'var(--blue-violet)', color: 'var(--white)' },
                    }}
                  >
                    <div className="delivery-checkout__map-btn">
                      <NovaPost width={18} height={18} />
                      <span>Select on the map</span>
                    </div>
                  </Button>
                </div>
              </div>

              <button
                type="button"
                className="delivery-checkout__option"
                onClick={() => setDeliveryMethod('ukr')}
              >
                <div className="delivery-checkout__option-left">
                  <img src={deliveryMethod === 'ukr' ? RadioActive : RadioInactive} alt="radio" />
                  <Typography variant="body1">Self-pickup from the Ukr Post</Typography>
                </div>
                <Typography variant="body1" sx={{ fontSize: '15px', fontWeight: 500 }}>
                  {'\u20AC'} 5.00
                </Typography>
              </button>

              <button
                type="button"
                className="delivery-checkout__option"
                onClick={() => setDeliveryMethod('dhl')}
              >
                <div className="delivery-checkout__option-left">
                  <img src={deliveryMethod === 'dhl' ? RadioActive : RadioInactive} alt="radio" />
                  <Typography variant="body1">Self-pickup from the DHL</Typography>
                </div>
                <Typography variant="body1" sx={{ fontSize: '15px', fontWeight: 500 }}>
                  {'\u20AC'} 30.00
                </Typography>
              </button>
            </div>
          </div>

          <div className="delivery-checkout__section">
            <Typography variant="h6" component="h2" sx={{ fontSize: '24px', fontWeight: 600 }}>
              Payment
            </Typography>

            <div className="delivery-checkout__options">
              <button
                type="button"
                className="delivery-checkout__option"
                onClick={() => setPaymentMethod('receipt')}
              >
                <div className="delivery-checkout__option-left">
                  <img
                    src={paymentMethod === 'receipt' ? RadioActive : RadioInactive}
                    alt="radio"
                  />
                  <Typography variant="body1">Payment upon receipt of goods</Typography>
                </div>
              </button>

              <div className="delivery-checkout__option delivery-checkout__option--expanded">
                <button
                  type="button"
                  className="delivery-checkout__option-header"
                  onClick={() => setPaymentMethod('online')}
                >
                  <div className="delivery-checkout__option-left">
                    <img
                      src={paymentMethod === 'online' ? RadioActive : RadioInactive}
                      alt="radio"
                    />
                    <Typography variant="body1">Self-pickup from the Nova Poshta</Typography>
                  </div>
                </button>

                <div className="delivery-checkout__payment-list">
                  <button
                    type="button"
                    className="delivery-checkout__payment-item"
                    onClick={() => setOnlinePayment('card')}
                  >
                    <div className="delivery-checkout__option-left">
                      <img
                        src={onlinePayment === 'card' ? RadioActive : RadioInactive}
                        alt="radio"
                      />
                      <Typography variant="body1">By card online</Typography>
                    </div>
                    <div className="delivery-checkout__payment-icons">
                      <Visa width={20} height={15} />
                      <MasterCard width={20} height={20} />
                    </div>
                  </button>

                  <button
                    type="button"
                    className="delivery-checkout__payment-item"
                    onClick={() => setOnlinePayment('gpay')}
                  >
                    <div className="delivery-checkout__option-left">
                      <img
                        src={onlinePayment === 'gpay' ? RadioActive : RadioInactive}
                        alt="radio"
                      />
                      <Typography variant="body1">Google Pay</Typography>
                    </div>
                    <GooglePay width={24} height={15} />
                  </button>

                  <button
                    type="button"
                    className="delivery-checkout__payment-item"
                    onClick={() => setOnlinePayment('apay')}
                  >
                    <div className="delivery-checkout__option-left">
                      <img
                        src={onlinePayment === 'apay' ? RadioActive : RadioInactive}
                        alt="radio"
                      />
                      <Typography variant="body1">Apple Pay</Typography>
                    </div>
                    <ApplePay width={23} height={23} />
                  </button>
                </div>
              </div>
            </div>
          </div>
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
