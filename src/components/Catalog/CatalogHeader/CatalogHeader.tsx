import type { FC } from 'react';
import { Typography } from '@mui/material';

import { Select } from '@/components';
import { SORT_BY } from '@/core/constants';

import './CatalogHeader.css';

export const CatalogHeader: FC = () => {
  return (
    <div className="catalog__header">
      <Typography className="catalog__title" variant="h4" sx={{ fontWeight: 600 }}>
        Catalog
      </Typography>

      <div className="catalog__sort-by">
        <Typography sx={{ fontWeight: 600, fontSize: '16px', color: 'var(--black)' }}>
          Sort by
        </Typography>
        <Select
          data={SORT_BY}
          maxWidth="135px"
          height="36px"
          color="var(--black)"
          fontSize="16px"
        />
      </div>
    </div>
  );
};
