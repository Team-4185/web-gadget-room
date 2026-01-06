import { useState } from 'react';
import { Container, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

import RadioActive from '/icons/RadioActive.svg';
import RadioInactive from '/icons/RadioInactive.svg';
import { Input } from '@/components/ui/Input/Input';
import { OrderSummary } from '@/components/shared/Cart/OrderSummary';

export const Delivery = () => {
  const [courierActive, setCourierActive] = useState(false);
  // const [novaPostaActive, setNovaPostActive] = useState(false);
  // const [ukrPostActive, setUrkPostaActive] = useState(false);
  // const [dhlActive, setDhlActive] = useState(false);

  const handleCourierActive = () => {
    setCourierActive((prev) => !prev);
  };
  // const handleNovaPostaActive = () => {
  //   setNovaPostActive((prev) => !prev);
  // };
  // const handleUrkPostaActive = () => {
  //   setUrkPostaActive((prev) => !prev);
  // };
  // const handleDhlActive = () => {
  //   setDhlActive((prev) => !prev);
  // };

  return (
    <>
      <Container disableGutters maxWidth="xl" className="shipping-container">
        <Box className="shipping-wrapper">
          <Box
            sx={{
              width: '623px',
              height: 'max-content',
              display: 'flex',
              flexDirection: 'column',
              gap: '40px',
            }}
          >
            <span style={{ fontWeight: '600', fontSize: '40px', color: '#000' }}>Delivery</span>
            <Box sx={{ display: 'flex', width: '100%', gap: '30px', flexDirection: 'column' }}>
              <span style={{ fontWeight: '600', fontSize: '20px', color: '#000' }}>Recipient</span>
              <Box sx={{ display: 'flex', gap: '15px', width: '100%', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <Input sx={{ width: '303px' }} inherit label="First Name" />
                  <Input sx={{ width: '303px' }} inherit label="Last Name" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <Input sx={{ width: '303px' }} inherit label="Email" />
                  <Input sx={{ width: '303px' }} inherit label="Phone" />
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', width: '100%', gap: '30px', flexDirection: 'column' }}>
              <span style={{ fontWeight: '600', fontSize: '20px', color: '#000' }}>
                Choos a delivery method
              </span>
              <Accordion onClick={handleCourierActive}>
                <AccordionSummary>
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <Box>
                      {courierActive ? (
                        <img src={RadioActive} alt="Radio Active button" />
                      ) : (
                        <img src={RadioInactive} alt="Radio Inactive button" />
                      )}
                      <span>Courier to your address</span>
                    </Box>
                    <span>€ 11.00</span>
                  </Box>
                </AccordionSummary>
                <AccordionDetails></AccordionDetails>
              </Accordion>
            </Box>
          </Box>
          <OrderSummary />
        </Box>
      </Container>
    </>
  );
};
