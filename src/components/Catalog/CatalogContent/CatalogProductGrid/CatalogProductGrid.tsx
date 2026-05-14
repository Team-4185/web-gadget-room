import type { FC } from 'react';

import { ProductCard } from '@/components';
import type { IProduct } from '@/core/types';

interface IProps {
  items: IProduct[];
  isLoading: boolean;
  onProductClick: (product: IProduct) => void;
}

export const CatalogProductGrid: FC<IProps> = ({
  items,
  isLoading,
  onProductClick,
}) => (
  <div className="catalog__products">
    {isLoading ? (
      <p className="catalog__products-status">Loading products...</p>
    ) : items.length ? (
      items.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => onProductClick(product)}
        />
      ))
    ) : (
      <p className="catalog__products-status">No products found.</p>
    )}
  </div>
);
