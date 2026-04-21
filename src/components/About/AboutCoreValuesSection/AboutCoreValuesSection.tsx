import { Container, Typography } from '@mui/material';

import { aboutCoreValues } from '@/core/constants';

import './AboutCoreValuesSection.css';

export const AboutCoreValuesSection = () => {
  return (
    <section className="about-values" aria-label="Core Values Section">
      <Container disableGutters>
        <div className="about-values__eyebrow-wrap">
          <Typography variant="aboutSectionHeading">WHAT WE STAND FOR</Typography>
        </div>
        <div className="about-values__title-wrap">
          <Typography
            variant="aboutHeading"
            component="h2"
            sx={{ fontSize: '48px', lineHeight: '56px', letterSpacing: '-2px', fontWeight: 700 }}
          >
            Our Core Values
          </Typography>
        </div>
        <div className="about-values__description-wrap">
          <Typography
            sx={{
              color: 'var(--muted-violet)',
              fontSize: '24px',
              lineHeight: '26px',
              letterSpacing: '-1px',
            }}
          >
            These principles guide every decision we make - from which products we list to how we
            handle customer support.
          </Typography>
        </div>

        <div className="about-values__grid">
          {aboutCoreValues.map((value) => (
            <article key={value.id} className="about-values__card">
              <Typography
                component="p"
                sx={{
                  color: 'var(--dark-gray-violet)',
                  fontSize: '16px',
                  lineHeight: '20px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                }}
              >
                {value.valueLabel}
              </Typography>
              <div className="about-values__icon-wrap">
                <div className={`about-values__icon about-values__icon--${value.tone}`}>
                  <value.Icon className="about-values__icon-svg" />
                </div>
              </div>
              <div className="about-values__card-title-wrap">
                <Typography
                  component="h3"
                  sx={{
                    fontSize: '32px',
                    lineHeight: '32px',
                    fontWeight: 700,
                    letterSpacing: '-1px',
                  }}
                >
                  {value.title}
                </Typography>
              </div>
              <div className="about-values__card-text-wrap">
                <Typography
                  component="p"
                  sx={{
                    fontSize: '24px',
                    lineHeight: '34px',
                    color: 'var(--muted-violet)',
                    letterSpacing: '-1px',
                  }}
                >
                  {value.text}
                </Typography>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};
