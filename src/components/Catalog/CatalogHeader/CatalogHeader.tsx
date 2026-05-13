import type { FC } from 'react';
import { Typography } from '@mui/material';

import { Select } from '@/components';
import { SORT_BY } from '@/core/constants';
import type { SortOption } from '@/core/types';

import './CatalogHeader.css';

interface IProps {
  sortBy: SortOption;
  onSortChange: (value: string) => void;
}

export const CatalogHeader: FC<IProps> = ({ sortBy, onSortChange }) => {
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
          value={sortBy}
          onChange={onSortChange}
        />
      </div>
    </div>
  );
};
