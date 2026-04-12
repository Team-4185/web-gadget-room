import { Container, Typography } from '@mui/material';

import { ABOUT_PROCESS_STEPS } from '@/core/constants';

import './AboutProcessSection.css';

export const AboutProcessSection = () => {
  return (
    <section className="about-process" aria-label="How We Work Section">
      <Container disableGutters>
        <Typography className="about-process__eyebrow">OUR PROCESS</Typography>
        <Typography variant="h2" component="h2" className="about-process__title">
          How We Work
        </Typography>
        <Typography className="about-process__description">
          From supplier verification to after-sales support, each step is designed to reduce risk.
        </Typography>

        <div className="about-process__line">
          {ABOUT_PROCESS_STEPS.map((step, index) => (
            <article key={step.id} className="about-process__item">
              <div className="about-process__dot">{index + 1}</div>
              <Typography component="h3" className="about-process__item-title">
                {step.title}
              </Typography>
              <Typography component="p" className="about-process__item-text">
                {step.text}
              </Typography>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};

