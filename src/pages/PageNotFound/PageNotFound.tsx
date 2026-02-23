import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { NotFoundContent } from '@/components';

export const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Container disableGutters>
      <NotFoundContent onBackHome={() => navigate('/')} />
    </Container>
  );
};
