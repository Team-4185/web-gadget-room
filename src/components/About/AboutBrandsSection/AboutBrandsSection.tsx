import { Container, Typography } from '@mui/material';

import { aboutBrands } from '@/core/constants';

import './AboutBrandsSection.css';

export const AboutBrandsSection = () => {
  return (
    <section className="about-brands" aria-label="Official Brands Section">
      <Container disableGutters>
        <div className="about-brands__eyebrow-wrap">
          <Typography variant="aboutSectionHeading">OFFICIAL PARTNERS & BRANDS WE CARRY</Typography>
        </div>
        <div className="about-brands__grid">
          {aboutBrands.map((brand) => (
            <div key={brand} className="about-brands__pill">
              {brand}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
