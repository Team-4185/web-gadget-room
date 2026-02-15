import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

import Lock from '/icons/lock.svg';
import Voucher from '/icons/voucher.svg';
import ExpandMoreIcon from '/icons/ExpandMore.svg';
import type { RootState } from '@/core/store';

import './OrderSummary.css';

const summaryTitleSx = { fontSize: '20px', fontWeight: 700, lineHeight: 1 };
const rowLabelSx = { fontWeight: 600, lineHeight: 1 };
const rowValueSx = { fontSize: '15px', fontWeight: 500, lineHeight: 1 };
const totalLabelSx = { fontWeight: 600, lineHeight: 1 };
const totalValueSx = { fontSize: '20px', fontWeight: 700, lineHeight: 1 };
const buttonTextSx = { fontWeight: 600, lineHeight: 1 };
const voucherLabelSx = { lineHeight: 1 };
const voucherOptionalSx = { lineHeight: 1, opacity: 0.7 };
const accordionDetailsTextSx = { fontSize: '14px', lineHeight: 1.4 };

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
        <button
          className="order-summary__button"
          onClick={handleContinue}
          disabled={continueDisabled}
        >
          <img src={Lock} alt="Lock" />
          <Typography variant="body1" component="span" sx={buttonTextSx}>
            {continueLabel}
          </Typography>
        </button>
      )}

      <Accordion className="order-summary__accordion" disableGutters>
        <AccordionSummary
          className="order-summary__accordion-summary"
          aria-controls="panel1-content"
          id="panel1-header"
          expandIcon={
            <img src={ExpandMoreIcon} alt="Expand More" className="order-summary__expand" />
          }
        >
          <div className="order-summary__voucher">
            <img src={Voucher} alt="voucher" className="order-summary__voucher-icon" />
            <Typography variant="body1" component="span" sx={voucherLabelSx}>
              Use discount voucher
            </Typography>
            <Typography variant="body1" component="span" sx={voucherOptionalSx}>
              (optional)
            </Typography>
          </div>
        </AccordionSummary>

        <AccordionDetails className="order-summary__accordion-details">
          <Typography variant="body1" sx={accordionDetailsTextSx}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
