import { useNavigate } from 'react-router';
import { Typography } from '@mui/material';

import { Lock } from '@/assets';
import { useAppSelector } from '@/core/store';
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
  taxAmount?: number;
  shippingAmount?: number;
  className?: string;
};

export const OrderSummary = ({
  onContinue,
  continueTo = '/payment',
  continueLabel = 'continue to payment',
  continueDisabled = false,
  showContinueButton = true,
  taxAmount = 13,
  shippingAmount = 13,
  className,
}: OrderSummaryProps) => {
  const amountOfProducts = useAppSelector((state) => state.cart.totalAmount);
  const subTotal = useAppSelector((state) => state.cart.totalPrice);

  const total = taxAmount + shippingAmount + subTotal;

  const navigate = useNavigate();

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
      return;
    }
    navigate(continueTo);
  };

  return (
    <div className={`order-summary ${className ?? ''}`}>
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
            $ {amountOfProducts ? subTotal.toFixed(2) : 0}
          </Typography>
        </div>

        <div className="order-summary__row">
          <Typography variant="body1" component="span" sx={rowLabelSx}>
            Tax
          </Typography>
          <Typography variant="body1" component="span" sx={rowValueSx}>
            $ {amountOfProducts ? taxAmount.toFixed(2) : 0}
          </Typography>
        </div>

        <div className="order-summary__row">
          <Typography variant="body1" component="span" sx={rowLabelSx}>
            Delivery
          </Typography>
          <Typography variant="body1" component="span" sx={rowValueSx}>
            $ {amountOfProducts ? shippingAmount.toFixed(2) : 0}
          </Typography>
        </div>
      </div>

      <div className="order-summary__divider" />

      <div className="order-summary__total">
        <Typography variant="h6" component="span" sx={totalLabelSx}>
          Total
        </Typography>
        <Typography variant="h6" component="span" sx={totalValueSx}>
          $ {amountOfProducts ? total.toFixed(2) : 0}
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
