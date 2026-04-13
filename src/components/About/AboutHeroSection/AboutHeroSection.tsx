import { Typography } from '@mui/material';

import './AboutHeroSection.css';

export const AboutHeroSection = () => {
  return (
    <section className="about-hero" aria-label="About Hero Section">
      <div className="about-hero__banner">
        <div className="about-hero__title-wrap">
          <Typography component="h1" className="about-hero__title">
            <Typography component="span" className="about-hero__title-light">
              About
            </Typography>{' '}
            <Typography component="span" className="about-hero__title-strong">
              GADGETROOM
            </Typography>
          </Typography>
          <Typography component="p" className="about-hero__trust">
            Technology you can trust
          </Typography>
        </div>

        <div className="about-hero__stats">
          <div className="about-hero__stat-item">
            <Typography component="p">47k+</Typography>
            <Typography component="span">HAPPY CUSTOMERS</Typography>
          </div>
          <div className="about-hero__stat-item">
            <Typography component="p">2.4k+</Typography>
            <Typography component="span">PRODUCTS</Typography>
          </div>
          <div className="about-hero__stat-item">
            <Typography component="p">6 yrs</Typography>
            <Typography component="span">ON MARKET</Typography>
          </div>
        </div>

        <div className="about-hero__description-wrap">
          <Typography component="p" className="about-hero__description">
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
    </section>
  );
};
