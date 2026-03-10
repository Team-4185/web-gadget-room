import { Container } from '@mui/material';

import { DeliveryCheckout } from '@/components';

export const Delivery = () => {
  return (
    <section className="delivery-page">
      <Container disableGutters>
        <DeliveryCheckout />
      </Container>
    </section>
  );
};
