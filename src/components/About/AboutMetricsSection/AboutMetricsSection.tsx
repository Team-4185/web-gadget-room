import { Container, Typography } from '@mui/material';

import { aboutMetrics } from '@/core/constants';

import './AboutMetricsSection.css';

export const AboutMetricsSection = () => {
  return (
    <section className="about-metrics" aria-label="About Metrics Section">
      <Container disableGutters>
        <div className="about-metrics__panel">
          <div className="about-metrics__grid">
            {aboutMetrics.map((item) => (
              <div key={item.id} className="about-metrics__item">
                <Typography
                  component="p"
                  sx={{ fontSize: '64px', lineHeight: 1, fontWeight: 700, color: 'var(--amber)' }}
                >
                  {item.value}
                </Typography>
                <div className="about-metrics__label-wrap">
                  <Typography
                    component="p"
                    sx={{
                      color: 'var(--white)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      lineHeight: '16px',
                    }}
                  >
                    {item.label}
                  </Typography>
                </div>
                <div className="about-metrics__caption-wrap">
                  <Typography
                    component="p"
                    sx={{ color: 'var(--white)', fontWeight: 400, lineHeight: 1 }}
                  >
                    {item.caption}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

