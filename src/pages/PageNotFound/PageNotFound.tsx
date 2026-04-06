import { Container } from '@mui/material';
import { useNavigate } from 'react-router';

import { NotFoundContent } from '@/components';

export const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <section aria-label="Page Not Found">
      <Container disableGutters>
        <NotFoundContent onBackHome={() => navigate('/')} />
      </Container>
    </section>
  );
};
