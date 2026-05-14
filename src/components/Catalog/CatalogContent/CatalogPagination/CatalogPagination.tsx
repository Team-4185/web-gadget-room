import type { FC } from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import type { PaginationRenderItemParams } from '@mui/material/Pagination';

import { ChevronLeft, ChevronRight } from '@/assets';

import { catalogPaginationStyles } from './catalogPaginationStyles';

interface IProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const renderPaginationItem = (item: PaginationRenderItemParams) => {
  if (item.type === 'next') {
    return (
      <PaginationItem
        {...item}
        slots={{
          next: () => (
            <div data-pagination="next">
              <p>Next</p>
              <ChevronRight />
            </div>
          ),
        }}
        shape="rounded"
      />
    );
  }

  if (item.type === 'previous') {
    return (
      <PaginationItem
        {...item}
        slots={{
          previous: () => (
            <div data-pagination="prev">
              <ChevronLeft />
            </div>
          ),
        }}
        shape="rounded"
      />
    );
  }

  return <PaginationItem {...item} />;
};

export const CatalogPagination: FC<IProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <Pagination
    page={currentPage}
    count={totalPages}
    onChange={(_event, page) => onPageChange(page)}
    renderItem={renderPaginationItem}
    sx={catalogPaginationStyles}
  />
);
