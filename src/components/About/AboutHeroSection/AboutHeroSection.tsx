import { Container, Typography } from '@mui/material';

import { Button } from '@/components';
import { ABOUT_HERO, ABOUT_HERO_BADGES } from '@/core/constants';

import './AboutHeroSection.css';

export const AboutHeroSection = () => {
  return (
    <section className="about-hero" aria-label="About Hero Section">
      <Container disableGutters>
        <div className="about-hero__layout">
          <div className="about-hero__media">
            <img src={ABOUT_HERO.imageSrc} alt="About GadgetRoom" />
          </div>

          <div className="about-hero__content">
            <Typography
              component="p"
              sx={{
                fontSize: '12px',
                fontWeight: 700,
                lineHeight: '20px',
                color: 'var(--blue-violet)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {ABOUT_HERO.eyebrow}
            </Typography>
            <Typography
              variant="h2"
              component="h1"
              sx={{ marginTop: '10px', maxWidth: '520px', color: 'var(--white)' }}
            >
              {ABOUT_HERO.title}
            </Typography>
            <Typography
              component="p"
              sx={{
                marginTop: '20px',
                maxWidth: '520px',
                fontSize: '18px',
                lineHeight: '30px',
                color: 'var(--white-opacity-4)',
              }}
            >
              {ABOUT_HERO.description}
            </Typography>
            <Button maxWidth="165px" height="48px" fontSize="14px" sx={{ marginTop: '28px' }}>
              {ABOUT_HERO.ctaText}
            </Button>
          </div>

          <div className="about-hero__badges">
            {ABOUT_HERO_BADGES.map((badge) => (
              <article key={badge.id} className="about-hero__badge-card">
                <Typography component="h2" sx={{ fontSize: '15px', lineHeight: '24px', color: 'var(--black)' }}>
                  {badge.title}
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    marginTop: '8px',
                    fontSize: '13px',
                    lineHeight: '20px',
                    color: 'var(--product-bottom-icon-text)',
                  }}
                >
                  {badge.text}
                </Typography>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

