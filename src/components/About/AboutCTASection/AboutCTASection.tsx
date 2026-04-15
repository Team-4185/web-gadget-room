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
            <Typography variant="aboutSectionHeading" sx={{ color: 'var(--blue-violet)' }}>
              READY TO SHOP?
            </Typography>
            <div className="about-cta__title-wrap">
              <Typography variant="aboutHeading" component="h2" sx={{ color: '#2d2d2d' }}>
                Find your perfect device today
              </Typography>
            </div>
            <div className="about-cta__text-wrap">
              <Typography sx={{ color: '#8f8faf', fontSize: '20px', lineHeight: '32px' }}>
                Thousands of products, verified quality, and fast delivery across Ukraine.
              </Typography>
            </div>
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
