import { useEffect, useRef, type FC } from 'react';
import { useNavigate } from 'react-router';

import type { IProduct, SortOption } from '@/core/types';
import { CatalogHeader } from '@/components';

import { CatalogPagination } from './CatalogPagination/CatalogPagination';
import { CatalogProductGrid } from './CatalogProductGrid/CatalogProductGrid';

import './CatalogContent.css';

interface IProps {
  items: IProduct[];
  sortBy: SortOption;
  totalPages: number;
  currentPage: number;
  isLoading?: boolean;
  onSortChange: (value: string) => void;
  onPageChange: (page: number) => void;
}

export const CatalogContent: FC<IProps> = ({
  items,
  sortBy,
  totalPages,
  currentPage,
  isLoading = false,
  onSortChange,
  onPageChange,
}) => {
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    contentRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [currentPage]);

  const handleProductClick = (product: IProduct) => {
    navigate(`/product/${product.id}`, { state: product });
  };

  return (
    <div ref={contentRef} className="catalog__content">
      <CatalogHeader sortBy={sortBy} onSortChange={onSortChange} />
      <CatalogProductGrid
        items={items}
        isLoading={isLoading}
        onProductClick={handleProductClick}
      />
      <CatalogPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};
