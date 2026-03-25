import { Container } from '@mui/material';
import { useNavigate } from 'react-router';

import { EmptyCartContent } from '@/components';

export const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <section aria-label="Empty Cart">
      <Container disableGutters>
        <EmptyCartContent onBackToCatalog={() => navigate('/catalog')} />
      </Container>
    </section>
  );
};
