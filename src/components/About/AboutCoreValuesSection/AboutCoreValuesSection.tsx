import { Container, Typography } from '@mui/material';

import { ABOUT_CORE_VALUES } from '@/core/constants';

import './AboutCoreValuesSection.css';

export const AboutCoreValuesSection = () => {
  return (
    <section className="about-values" aria-label="Core Values Section">
      <Container disableGutters>
        <Typography className="about-values__eyebrow">WHAT WE STAND FOR</Typography>
        <Typography variant="h2" component="h2" className="about-values__title">
          Our Core Values
        </Typography>
        <Typography className="about-values__description">
          Built around service quality, honest communication, and long-term customer trust.
        </Typography>

        <div className="about-values__grid">
          {ABOUT_CORE_VALUES.map((value, index) => (
            <article key={value.id} className="about-values__card">
              <div className={`about-values__icon about-values__icon--${index + 1}`}>{index + 1}</div>
              <Typography component="h3" className="about-values__card-title">
                {value.title}
              </Typography>
              <Typography component="p" className="about-values__card-text">
                {value.text}
              </Typography>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};

