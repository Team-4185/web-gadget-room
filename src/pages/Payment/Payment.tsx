import { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  MenuItem,
} from '@mui/material';

import { OrderSummary } from '../../components/ui/Cart/OrderSummary';
import { Input } from '../../components/ui/Input/Input';
import Rectangle from '/icons/greyRectangle.svg';
import RadioActive from '/icons/RadioActive.svg';
import RadioInactive from '/icons/RadioInactive.svg';

export const Payment = () => {
  const [activeCard, setActiveCard] = useState(false);
  const [activePayPal, setActivePaypal] = useState(false);

  const handleActiveCard = () => setActiveCard((prev) => !prev);
  const handleActivePaypal = () => setActivePaypal((prev) => !prev);

  const months = [
    { id: 1, value: 'december', name: 'December' },
    { id: 2, value: 'january', name: 'January' },
    { id: 3, value: 'february', name: 'February' },
    { id: 4, value: 'march', name: 'March' },
    { id: 5, value: 'april', name: 'April' },
    { id: 6, value: 'may', name: 'May' },
    { id: 7, value: 'june', name: 'June' },
    { id: 8, value: 'july', name: 'July' },
    { id: 9, value: 'august', name: 'August' },
    { id: 10, value: 'september', name: 'September' },
    { id: 11, value: 'october', name: 'October' },
    { id: 12, value: 'november', name: 'November' },
  ];

  const cardYears = [];
  for (let year = 2025 - 20; year <= 2025 + 10; year++) cardYears.push(year);

  return (
    <>
      <Container disableGutters maxWidth="xl" className="payment-container">
        <Box className="payment-wrapper">
          <Box className="payment-form">
            <h1 className="payment-title">Payment</h1>
            <span className="payment-subtitle">Choose Payment Method</span>

            {/* Credit Card Accordion */}
            <Accordion className="accordion credit-card" onClick={handleActiveCard} disableGutters>
              <AccordionSummary
                className="accordion-summary"
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Box className="accordion-header">
                  <Box className="accordion-radio">
                    <img src={activeCard ? RadioActive : RadioInactive} alt="radio" />
                    <span className="accordion-label">Credit Card</span>
                  </Box>
                  <Box className="accordion-icons">
                    <img src={Rectangle} alt="rectangle" />
                    <img src={Rectangle} alt="rectangle" />
                    <img src={Rectangle} alt="rectangle" />
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box className="accordion-content">
                  <Input type="number" inherit id="cardNumber" label="Card Number" />
                  <Input inherit id="nameOnCard" label="Name on card" />
                  <Box className="accordion-row">
                    <Input className="month" inherit select label="Month">
                      {months.map((month) => (
                        <MenuItem key={month.id} value={month.value}>
                          {month.name}
                        </MenuItem>
                      ))}
                    </Input>
                    <Input className="year" inherit select label="Year">
                      {cardYears.map((year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Input>
                    <Input type="number" inherit label="CVV" />
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>

            {/* PayPal Accordion */}
            <Accordion className="accordion paypal" onClick={handleActivePaypal} disableGutters>
              <AccordionSummary
                className="accordion-summary"
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Box className="accordion-header">
                  <Box className="accordion-radio">
                    <img src={activePayPal ? RadioActive : RadioInactive} alt="radio" />
                    <span className="accordion-label">Paypal</span>
                  </Box>
                  <Box className="accordion-icons">
                    <img src={Rectangle} alt="rectangle" />
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box className="accordion-content">
                  <Input type="number" inherit id="paypalCardNumber" label="Card Number" />
                  <Input inherit id="paypalNameOnCard" label="Name on card" />
                  <Box className="accordion-row">
                    <Input className="month" inherit select label="Month">
                      {months.map((month) => (
                        <MenuItem key={month.id} value={month.value}>
                          {month.name}
                        </MenuItem>
                      ))}
                    </Input>
                    <Input className="year" inherit select label="Year">
                      {cardYears.map((year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Input>
                    <Input type="number" inherit label="CVV" />
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>

          <OrderSummary />
        </Box>
      </Container>
    </>
  );
};
