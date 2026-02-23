import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { EmptyCartContent } from '@/components';

export const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <Container disableGutters>
      <EmptyCartContent onBackToCatalog={() => navigate('/catalog')} />
    </Container>
  );
};
