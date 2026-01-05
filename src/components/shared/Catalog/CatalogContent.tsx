import { Box } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

import type { IProduct, SortOption } from '../../../core/types/product';
import { CatalogHeader } from './CatalogHeader';
import { CatalogProducts } from './CatalogProducts';
import { CatalogPagination } from './CatalogPagination';

interface CatalogContentProps {
  sortBy: SortOption;
  onSortChange: (event: SelectChangeEvent<string>) => void;
  items: IProduct[];
  totalPages: number;
  currentPage: number;
  onPrev: () => void;
  onNext: () => void;
  onPageChange: (page: number) => void;
}

export const CatalogContent = ({
  sortBy,
  onSortChange,
  items,
  totalPages,
  currentPage,
  onPrev,
  onNext,
  onPageChange,
}: CatalogContentProps) => {
  return (
    <Box className="catalog-content">
      <CatalogHeader sortBy={sortBy} onSortChange={onSortChange} />
      <CatalogProducts items={items} />

      <CatalogPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPrev={onPrev}
        onNext={onNext}
        onPageChange={onPageChange}
      />
    </Box>
  );
};
