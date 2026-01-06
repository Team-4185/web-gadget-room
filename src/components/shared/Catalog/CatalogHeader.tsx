import { Box, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

import { Input } from '@/components/ui/Input/Input';

type SortOption =
  | 'popularity'
  | 'name A to Z'
  | 'name Z to A'
  | 'price decreasing'
  | 'price increasing'
  | 'number of reviews';

interface CatalogHeaderProps {
  sortBy: SortOption;
  onSortChange: (event: SelectChangeEvent<string>) => void;
}

export const CatalogHeader = ({ sortBy, onSortChange }: CatalogHeaderProps) => {
  return (
    <Box className="catalog-header">
      <span className="catalog-title">Catalog</span>

      <Box className="catalog-sort">
        <span>Sort by</span>

        <Input
          inherit
          select
          value={sortBy}
          onChange={onSortChange}
          id="sort"
          name="sort"
          className="catalog-sort-select"
        >
          <MenuItem value="popularity">Popularity</MenuItem>
          <MenuItem value="name A to Z">Name A to Z</MenuItem>
          <MenuItem value="name Z to A">Name Z to A</MenuItem>
          <MenuItem value="price decreasing">Price decreasing</MenuItem>
          <MenuItem value="price increasing">Price increasing</MenuItem>
          <MenuItem value="number of reviews">Number of reviews</MenuItem>
        </Input>
      </Box>
    </Box>
  );
};
