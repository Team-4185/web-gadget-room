import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@mui/material';

import Lock from '/icons/lock.svg';
import Voucher from '/icons/voucher.svg';
import ExpandMoreIcon from '/icons/ExpandMore.svg';
import type { RootState } from '../../../core/store';

import '../../../pages/Cart/Cart.css';

export const OrderSummary = () => {
  const amountOfProducts = useSelector((state: RootState) => state.cart.cart.length);
  const tax = 13;
  const shipping = 13;
  const subTotal = useSelector((state: RootState) =>
    state.cart.cart.reduce((sum, product) => sum + product.price * product.amount, 0)
  );
  const total = tax + shipping + subTotal;

  const navigate = useNavigate();
  const handleContinue = () => {
    navigate('/payment');
  };
  return (
    <>
      <Box className="cart-right">
        <span className="cart-summary-title">Order Summary</span>
        <Divider sx={{ mt: '31px', mb: '29px' }} />

        <Box sx={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
          <Box className="cart-summary-row">
            <div className="cart-summary-label">Subtotal</div>
            <div className="cart-summary-value">€ {amountOfProducts ? subTotal.toFixed(2) : 0}</div>
          </Box>
          <Box className="cart-summary-row">
            <div className="cart-summary-label">Tax</div>
            <div className="cart-summary-value">€ {amountOfProducts ? tax.toFixed(2) : 0}</div>
          </Box>
          <Box className="cart-summary-row">
            <div className="cart-summary-label">Shipping</div>
            <div className="cart-summary-value">€ {amountOfProducts ? shipping.toFixed(2) : 0}</div>
          </Box>
        </Box>

        <Divider sx={{ mt: '32px', mb: '49px' }} />

        <Box className="cart-total">
          <div className="cart-total-label">Total</div>
          <div className="cart-total-value">€ {amountOfProducts ? total : 0}</div>
        </Box>

        <button className="cart-btn-payment" onClick={handleContinue}>
          <img src={Lock} alt="Lock" /> continue to payment
        </button>

        <Accordion
          sx={{
            mt: '30px',
            mb: '30px',
            border: 'none',
            boxShadow: 'none',
            background: 'none',
            '&:before': { display: 'none' },
            alignItems: 'center',
          }}
        >
          <AccordionSummary aria-controls="panel1-content" id="panel1-header">
            <Typography className="cart-voucher-text">
              <img src={Voucher} alt="voucher" />
              <span className="cart-voucher-text">Use discount voucher</span>
              <span className="cart-voucher-optional">(optional)</span>
              <img src={ExpandMoreIcon} alt="Expand More" />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};
