import type { FC } from 'react';

import { ProductCard } from '@/components';
import { CATALOG_PAGE_SIZE } from '@/core/constants';
import type { IProduct } from '@/core/types';

import { CatalogProductCardSkeleton } from './CatalogProductCardSkeleton/CatalogProductCardSkeleton';

import './CatalogProductGrid.css';

interface IProps {
  items: IProduct[];
  isLoading: boolean;
  onProductClick: (product: IProduct) => void;
}

const catalogProductSkeletons = Array.from({ length: CATALOG_PAGE_SIZE }, (_, index) => index);

export const CatalogProductGrid: FC<IProps> = ({ items, isLoading, onProductClick }) => (
  <div className="catalog__products">
    {isLoading ? (
      catalogProductSkeletons.map((item) => <CatalogProductCardSkeleton key={item} />)
    ) : items.length ? (
      items.map((product) => (
        <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} />
      ))
    ) : (
      <p className="catalog__products-status">No products found.</p>
    )}
  </div>
);
