import { Container, Typography } from '@mui/material';

import { ABOUT_METRICS } from '@/core/constants';

import './AboutMetricsSection.css';

export const AboutMetricsSection = () => {
  return (
    <section className="about-metrics" aria-label="About Metrics Section">
      <Container disableGutters>
        <div className="about-metrics__grid">
          {ABOUT_METRICS.map((item) => (
            <div key={item.id} className="about-metrics__item">
              <Typography component="span">{item.value}</Typography>
              <Typography component="p">{item.label}</Typography>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

