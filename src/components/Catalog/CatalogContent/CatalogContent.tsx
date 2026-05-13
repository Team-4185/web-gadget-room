import type { FC } from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import { useNavigate } from 'react-router';

import { ChevronRight, ChevronLeft } from '@/assets';
import type { IProduct } from '@/core/types';
import { CatalogHeader, ProductCard } from '@/components';

import './CatalogContent.css';

interface IProps {
  // sortBy: SortOption;
  // onSortChange: (event: SelectChangeEvent<string>) => void;
  items: IProduct[];
  // totalPages: number;
  // currentPage: number;
  // onPrev: () => void;
  // onNext: () => void;
  // onPageChange: (page: number) => void;
}

export const CatalogContent: FC<IProps> = ({
  // sortBy,
  // onSortChange,
  items,
  // totalPages,
  // currentPage,
  // onPrev,
  // onNext,
  // onPageChange,
}) => {
  const navigate = useNavigate();

  return (
    <div className="catalog__content">
      <CatalogHeader />
      <div className="catalog__products">
        {items.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => navigate(`/product/${product.id}`, { state: product })}
          />
        ))}
      </div>
      <Pagination
        count={10}
        renderItem={(item) => {
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
        }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '60px',
          height: '36px',

          '& .MuiPagination-ul': {
            borderRadius: '10px',
            boxShadow: '0 0 7px 0 var(--blue-violet)',
            background: 'var(--white)',
          },

          '& .MuiPaginationItem-root:not(.MuiPaginationItem-previousNext)': {
            width: '26px',
            height: '26px',
            minWidth: '26px',
            fontWeight: 600,
            fontSize: '16px',
            padding: 0,
            margin: 0,
          },
          '& .MuiPaginationItem-root.Mui-selected': {
            background: 'var(--blue-violet)',
            color: 'var(--white)',
          },
          '& .MuiPaginationItem-root:not(.Mui-selected):not(.MuiPaginationItem-previousNext)': {
            border: '1px solid var(--blue-violet)',
            color: 'var(--black)',
          },
          '& .MuiPaginationItem-previousNext': {
            height: '36px',
            padding: 0,
            margin: 0,
            boxShadow: '0 0 7px 0 var(--blue-violet)',
            background: 'var(--white)',
            borderRadius: '10px',
          },
          '& .MuiPagination-ul > :first-child .MuiPaginationItem-previousNext': {
            width: '26px',
            minWidth: '26px',
          },
          '& .MuiPagination-ul > :last-child .MuiPaginationItem-previousNext': {
            width: '73px',
            minWidth: '73px',
          },
          '& .MuiPagination-ul > :first-child': {
            marginRight: '13px',
          },
          '& .MuiPagination-ul > :last-child': {
            marginLeft: '13px',
          },
          '& .MuiPagination-ul > :not(:first-child):not(:nth-last-child(2)):not(:last-child)': {
            marginRight: '17px',
          },
          '& [data-pagination="next"] , & [data-pagination="prev"]': {
            display: 'flex',
            alignItems: 'center',
          },
          '& [data-pagination="next"] p': {
            fontWeight: 600,
            fontSize: '16px',
            color: 'var(--black)',
          },
        }}
      />
    </div>
  );
};
