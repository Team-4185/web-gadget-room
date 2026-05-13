import { Container, Typography } from '@mui/material';

import { aboutProcessSteps } from '@/core/constants';

import './AboutProcessSection.css';

export const AboutProcessSection = () => {
  return (
    <section className="about-process" aria-label="How We Work Section">
      <Container disableGutters>
        <div className="about-process__eyebrow-wrap">
          <Typography variant="aboutSectionHeading">OUR PROCESS</Typography>
        </div>
        <div className="about-process__title-wrap">
          <Typography
            variant="aboutHeading"
            component="h2"
            sx={{ fontSize: '48px', lineHeight: '56px', fontWeight: 700 }}
          >
            How We Work
          </Typography>
        </div>
        <div className="about-process__description-wrap">
          <Typography
            sx={{
              color: 'var(--muted-violet)',
              fontSize: '24px',
              lineHeight: '28px',
              letterSpacing: '-1px',
            }}
          >
            From selecting products to delivering them at your door - here's how{' '}
            <span style={{ fontWeight: 600 }}>GadgetRoom</span> operates.
          </Typography>
        </div>

        <div className="about-process__line">
          {aboutProcessSteps.map((step) => (
            <article key={step.id} className="about-process__item">
              <div className={`about-process__dot about-process__dot--${step.tone}`}>
                <step.Icon className="about-process__dot-icon" />
              </div>
              <Typography
                component="h3"
                sx={{
                  fontSize: '24px',
                  lineHeight: '32px',
                  fontWeight: 600,
                  letterSpacing: '-1px',
                  marginTop: '10px',
                }}
              >
                {step.title}
              </Typography>
              <div className="about-process__item-text-wrap">
                <Typography
                  component="p"
                  sx={{
                    fontSize: '16px',
                    lineHeight: '19px',
                    color: 'var(--muted-violet)',
                    letterSpacing: '-1px',
                  }}
                >
                  {step.text}
                </Typography>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};
