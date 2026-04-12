import { Container, Typography } from '@mui/material';

import { ABOUT_BRANDS } from '@/core/constants';

import './AboutBrandsSection.css';

export const AboutBrandsSection = () => {
  return (
    <section className="about-brands" aria-label="Official Brands Section">
      <Container disableGutters>
        <Typography className="about-brands__eyebrow">OFFICIAL PARTNERS & BRANDS WE CARRY</Typography>
        <div className="about-brands__grid">
          {ABOUT_BRANDS.map((brand) => (
            <div key={brand} className="about-brands__pill">
              {brand}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

