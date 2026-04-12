import { Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

import { Button } from '@/components';

import './AboutCTASection.css';

export const AboutCTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="about-cta" aria-label="About CTA Section">
      <Container disableGutters>
        <div className="about-cta__card">
          <div>
            <Typography className="about-cta__eyebrow">READY TO SHOP?</Typography>
            <Typography variant="h2" component="h2" className="about-cta__title">
              Find your perfect device today
            </Typography>
            <Typography className="about-cta__text">
              Thousands of products, verified quality, and fast delivery across Ukraine.
            </Typography>
          </div>
          <Button
            maxWidth="239px"
            height="76px"
            fontSize="16px"
            onClick={() => navigate('/catalog')}
            sx={{ background: 'var(--blue-violet)', color: 'var(--white)' }}
          >
            GO TO CATALOG
          </Button>
        </div>
      </Container>
    </section>
  );
};
