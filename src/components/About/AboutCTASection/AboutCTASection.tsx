import { Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

import { Button } from '@/components';
import { ABOUT_CTA } from '@/core/constants';

import './AboutCTASection.css';

export const AboutCTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="about-cta" aria-label="About CTA Section">
      <Container disableGutters>
        <div className="about-cta__card">
          <div>
            <Typography className="about-cta__eyebrow">{ABOUT_CTA.eyebrow}</Typography>
            <Typography variant="h2" component="h2" className="about-cta__title">
              {ABOUT_CTA.title}
            </Typography>
            <Typography className="about-cta__text">{ABOUT_CTA.text}</Typography>
          </div>
          <Button maxWidth="239px" height="76px" fontSize="16px" onClick={() => navigate('/catalog')}>
            {ABOUT_CTA.button}
          </Button>
        </div>
      </Container>
    </section>
  );
};

