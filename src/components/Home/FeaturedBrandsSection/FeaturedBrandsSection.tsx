import { Typography, Container } from '@mui/material';

import type { BrandInfo } from '@/core/types';

import './FeaturedBrandsSection.css';

type Props = {
  brands: BrandInfo[];
};

export const FeaturedBrandsSection = ({ brands }: Props) => {
  return (
    <section className="featured-brands" aria-label="Featured Brands">
      <Container disableGutters>
        <Typography variant="h3" component="h2" sx={{ fontWeight: 700, lineHeight: 1 }}>
          Featured Brands
        </Typography>

        <div className="featured-brands__grid">
          {brands.map((brand) => {
            const BrandIcon = brand.icon;
            return (
              <div key={brand.id} className="featured-brands__card">
                <Typography
                  component="h6"
                  variant="h6"
                  sx={{
                    display: 'flex',
                    width: '100%',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    fontWeight: 700,
                    lineHeight: '84%',
                  }}
                >
                  <BrandIcon className="featured-brands__icon" />
                  {brand.name}
                </Typography>

                <Typography
                  component="p"
                  sx={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'center',
                    marginTop: '10px',
                    fontSize: '14px',
                    lineHeight: '107%',
                  }}
                >
                  {brand.descr}
                </Typography>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
