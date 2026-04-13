import { Container, Typography } from '@mui/material';

import './AboutMetricsSection.css';

const metrics = [
  {
    id: 1,
    value: '47k+',
    label: 'HAPPY CUSTOMERS',
    caption: 'Served across Ukraine since 2019',
  },
  {
    id: 2,
    value: '2.4k+',
    label: 'PRODUCTS',
    caption: 'Smartphones',
  },
  {
    id: 3,
    value: '98%',
    label: 'SATISFACTION RATE',
    caption: 'Based on 12,000+ verified reviews',
  },
  {
    id: 4,
    value: '2.4k+',
    label: 'SUPPORT',
    caption: 'Round-the-clock customer care',
  },
] as const;

export const AboutMetricsSection = () => {
  return (
    <section className="about-metrics" aria-label="About Metrics Section">
      <Container disableGutters>
        <div className="about-metrics__panel">
          <div className="about-metrics__grid">
            {metrics.map((item) => (
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
