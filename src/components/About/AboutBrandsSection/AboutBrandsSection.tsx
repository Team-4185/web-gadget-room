import { Container, Typography } from '@mui/material';

import './AboutBrandsSection.css';

const brands = [
  'Apple',
  'Samsung',
  'Xiaomi',
  'Google Pixel',
  'OnePlus',
  'Huawei',
  'Sony',
  'Motorola',
] as const;

export const AboutBrandsSection = () => {
  return (
    <section className="about-brands" aria-label="Official Brands Section">
      <Container disableGutters>
        <div className="about-brands__eyebrow-wrap">
          <Typography variant="aboutSectionHeading">OFFICIAL PARTNERS & BRANDS WE CARRY</Typography>
        </div>
        <div className="about-brands__grid">
          {brands.map((brand) => (
            <div key={brand} className="about-brands__pill">
              {brand}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
