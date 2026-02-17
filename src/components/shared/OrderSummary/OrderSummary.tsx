import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

import { Lock } from '@/assets';
import type { RootState } from '@/core/store';
import { Button } from '@/components';

import './OrderSummary.css';

const summaryTitleSx = { fontSize: '20px', fontWeight: 700, lineHeight: 1 };
const rowLabelSx = { fontWeight: 600, lineHeight: 1 };
const rowValueSx = { fontSize: '15px', fontWeight: 500, lineHeight: 1 };
const totalLabelSx = { fontWeight: 600, lineHeight: 1 };
const totalValueSx = { fontSize: '20px', fontWeight: 700, lineHeight: 1 };
const buttonTextSx = { fontWeight: 600, lineHeight: 1 };

type OrderSummaryProps = {
  onContinue?: () => void;
  continueTo?: string;
  continueLabel?: string;
  continueDisabled?: boolean;
  showContinueButton?: boolean;
};

export const OrderSummary = ({
  onContinue,
  continueTo = '/payment',
  continueLabel = 'continue to payment',
  continueDisabled = false,
  showContinueButton = true,
}: OrderSummaryProps) => {
  const amountOfProducts = useSelector((state: RootState) => state.cart.cart.length);
  const tax = 13;
  const shipping = 13;

  const subTotal = useSelector((state: RootState) =>
    state.cart.cart.reduce((sum, product) => sum + product.price * product.amount, 0)
  );

  const total = tax + shipping + subTotal;

  const navigate = useNavigate();

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
      return;
    }
    navigate(continueTo);
  };

  return (
    <div className="order-summary">
      <Typography variant="h6" component="h2" sx={summaryTitleSx}>
        Order Summary
      </Typography>
      <div className="order-summary__divider" />

      <div className="order-summary__rows">
        <div className="order-summary__row">
          <Typography variant="body1" component="span" sx={rowLabelSx}>
            Subtotal
          </Typography>
          <Typography variant="body1" component="span" sx={rowValueSx}>
            {'\u20AC'} {amountOfProducts ? subTotal.toFixed(2) : 0}
          </Typography>
        </div>

        <div className="order-summary__row">
          <Typography variant="body1" component="span" sx={rowLabelSx}>
            Tax
          </Typography>
          <Typography variant="body1" component="span" sx={rowValueSx}>
            {'\u20AC'} {amountOfProducts ? tax.toFixed(2) : 0}
          </Typography>
        </div>

        <div className="order-summary__row">
          <Typography variant="body1" component="span" sx={rowLabelSx}>
            Delivery
          </Typography>
          <Typography variant="body1" component="span" sx={rowValueSx}>
            {'\u20AC'} {amountOfProducts ? shipping.toFixed(2) : 0}
          </Typography>
        </div>
      </div>

      <div className="order-summary__divider" />

      <div className="order-summary__total">
        <Typography variant="h6" component="span" sx={totalLabelSx}>
          Total
        </Typography>
        <Typography variant="h6" component="span" sx={totalValueSx}>
          {'\u20AC'} {amountOfProducts ? total.toFixed(2) : 0}
        </Typography>
      </div>

      {showContinueButton && (
        <Button
          className="order-summary__button "
          maxWidth="425px"
          height="56px"
          borderRadius="24px"
          onClick={handleContinue}
          disabled={continueDisabled}
          textTransform="upperCase"
          sx={{
            mt: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <div className="order-summary__button-lock">
            <Lock width={20} height={20} fill="currentColor" />
          </div>
          <Typography variant="body1" component="span" sx={buttonTextSx}>
            {continueLabel}
          </Typography>
        </Button>
      )}
    </div>
  );
};
