import type { FC } from 'react';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';

import type { IProduct, SortOption } from '@/core/types';
import { Badge, CatalogHeader, CatalogPagination, ProductCard } from '@/components';

import './CatalogContent.css';

interface IProps {
  sortBy: SortOption;
  onSortChange: (event: SelectChangeEvent<string>) => void;
  items: IProduct[];
  totalPages: number;
  currentPage: number;
  onPrev: () => void;
  onNext: () => void;
  onPageChange: (page: number) => void;
}

export const CatalogContent: FC<IProps> = ({
  sortBy,
  onSortChange,
  items,
  totalPages,
  currentPage,
  onPrev,
  onNext,
  onPageChange,
}) => {
  const navigate = useNavigate();

  return (
    <div className="catalog__content">
      <CatalogHeader sortBy={sortBy} onSortChange={onSortChange} />
      <div className="catalog__products">
        {items.map((product) =>
          product.badge ? (
            <Badge key={product.id} text={product.badge}>
              <ProductCard
                product={product}
                onClick={() => navigate(`/product/${product.id}`, { state: product })}
              />
            </Badge>
          ) : (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => navigate(`/product/${product.id}`, { state: product })}
            />
          )
        )}
      </div>
      <CatalogPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPrev={onPrev}
        onNext={onNext}
        onPageChange={onPageChange}
      />
    </div>
  );
};
