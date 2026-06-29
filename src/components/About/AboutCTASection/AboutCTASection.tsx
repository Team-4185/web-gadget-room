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
            <Typography variant="aboutSectionHeading">READY TO SHOP?</Typography>
            <div className="about-cta__title-wrap">
              <Typography variant="aboutHeading" component="h2">
                Find your perfect <br />
                device today
              </Typography>
            </div>
            <div className="about-cta__text-wrap">
              <Typography
                sx={{
                  color: 'var(--muted-violet)',
                  fontSize: '24px',
                  lineHeight: '34px',
                  letterSpacing: '-1px',
                }}
              >
                Thousands of products. Verified quality. Fast delivery across Ukraine. Your next
                gadget is one click away.
              </Typography>
            </div>
          </div>
          <Button
            maxWidth="239px"
            height="76px"
            fontSize="16px"
            borderRadius="8px"
            onClick={() => navigate('/catalog')}
          >
            GO TO CATALOG
          </Button>
        </div>
      </Container>
    </section>
  );
};
