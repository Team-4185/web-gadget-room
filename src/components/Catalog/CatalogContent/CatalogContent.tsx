import { useEffect, type FC } from 'react';
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
  scrollTrigger: number;
  isLoading?: boolean;
  onSortChange: (value: string) => void;
  onPageChange: (page: number) => void;
}

export const CatalogContent: FC<IProps> = ({
  items,
  sortBy,
  totalPages,
  currentPage,
  scrollTrigger,
  isLoading = false,
  onSortChange,
  onPageChange,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage, scrollTrigger]);

  const handleProductClick = (product: IProduct) => {
    navigate(`/product/${product.id}`, { state: product });
  };

  return (
    <div className="catalog__content">
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
