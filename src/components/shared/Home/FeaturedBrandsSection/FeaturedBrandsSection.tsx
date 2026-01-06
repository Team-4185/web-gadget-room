import { Box } from '@mui/material';

import type { Brand } from '../../../../core/types/home';

import './FeaturedBrandsSection.css';

type Props = {
  brands: Brand[];
};

export const FeaturedBrandsSection = ({ brands }: Props) => {
  return (
    <Box className="featured_brands_container">
      <span className="featured_brands__title">Featured Brands</span>
      <Box className="featured_brands__cards">
        {brands.map((brand) => (
          <Box className="featured_brands__cards__card" key={brand.id}>
            <span className="featured_brands__cards__card__title">
              <img className="featured_brands__cards__card__title__img" src={brand.icon} />
              {brand.name}
            </span>
            <span className="featured_brands__cards__card__description">{brand.descr}</span>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
