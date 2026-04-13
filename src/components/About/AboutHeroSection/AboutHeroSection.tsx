import { Typography } from '@mui/material';

import './AboutHeroSection.css';

export const AboutHeroSection = () => {
  return (
    <div className="about-hero" aria-label="About Hero Section">
      <div className="about-hero__title-wrap">
        <div className="about-hero__title">
          <Typography
            component="span"
            sx={{
              fontSize: '64px',
              lineHeight: '72px',
              letterSpacing: '-2px',
              color: 'var(--white)',
              fontWeight: 400,
            }}
          >
            About
          </Typography>
          <Typography
            component="span"
            sx={{
              fontSize: '96px',
              lineHeight: '72px',
              letterSpacing: '-2px',
              color: '#f8fcff',
              fontWeight: 700,
            }}
          >
            GADGETROOM
          </Typography>
        </div>
      </div>

      <div className="about-hero__trust-wrap">
        <Typography
          component="p"
          sx={{
            fontSize: '36px',
            lineHeight: '26px',
            color: 'var(--white)',
            fontWeight: 600,
            letterSpacing: '-2px',
          }}
        >
          Technology you can trust
        </Typography>
      </div>

      <div className="about-hero__stats">
        <div className="about-hero__stat-item">
          <div className="about-hero__stat-value">
            <Typography
              component="p"
              sx={{ color: 'var(--amber)', fontSize: '35px', fontWeight: 700, lineHeight: '35px' }}
            >
              47k+
            </Typography>
          </div>
          <div className="about-hero__stat-label">
            <Typography
              component="span"
              sx={{ color: 'var(--light-gray)', fontSize: '12px', lineHeight: '15px', fontWeight: 700 }}
            >
              HAPPY CUSTOMERS
            </Typography>
          </div>
        </div>
        <div className="about-hero__stat-item">
          <div className="about-hero__stat-value">
            <Typography
              component="p"
              sx={{ color: 'var(--amber)', fontSize: '35px', fontWeight: 700, lineHeight: '35px' }}
            >
              2.4k+
            </Typography>
          </div>
          <div className="about-hero__stat-label">
            <Typography
              component="span"
              sx={{ color: 'var(--light-gray)', fontSize: '12px', lineHeight: '15px', fontWeight: 700 }}
            >
              PRODUCTS
            </Typography>
          </div>
        </div>
        <div className="about-hero__stat-item">
          <div className="about-hero__stat-value">
            <Typography
              component="p"
              sx={{ color: 'var(--amber)', fontSize: '35px', fontWeight: 700, lineHeight: '35px' }}
            >
              6 yrs
            </Typography>
          </div>
          <div className="about-hero__stat-label">
            <Typography
              component="span"
              sx={{ color: 'var(--light-gray)', fontSize: '12px', lineHeight: '15px', fontWeight: 700 }}
            >
              ON MARKET
            </Typography>
          </div>
        </div>
      </div>

      <div className="about-hero__description-wrap">
        <Typography
          component="p"
          sx={{
            fontSize: '19px',
            lineHeight: '19px',
            letterSpacing: '0.8px',
            color: 'var(--white-opacity-4)',
          }}
        >
          We are an online store of smartphones.
          <br />
          Created to make modern technology simple,
          <br />
          accessible, and reliable for everyone.
        </Typography>
      </div>

      <div className="about-hero__media about-hero__media--left">
        <img src="/icons/greyBox.png" alt="Smartphone close-up" />
      </div>

      <div className="about-hero__media about-hero__media--right">
        <img src="/Home/phoneBack.png" alt="Phone side view" />
      </div>
    </div>
  );
};
