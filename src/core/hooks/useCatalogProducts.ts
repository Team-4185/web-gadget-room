import { useMemo } from 'react';

import type { BrandKey, IProduct, SortOption } from '../types/product';
import { BRANDS, PRICE_MIN } from '../constants/catalog';

interface UseCatalogProductsArgs {
  products: IProduct[];

  activeBrands: Record<BrandKey, boolean>;
  sliderValue: number;

  inStockActive: boolean;
  preOrderActive: boolean;

  sortBy: SortOption;
}

export const useCatalogProducts = ({
  products,
  activeBrands,
  sliderValue,
  inStockActive,
  preOrderActive,
  sortBy,
}: UseCatalogProductsArgs): IProduct[] => {
  return useMemo(() => {
    let filtered: IProduct[] = [...products];

    // 1) Brands
    const selectedBrands = BRANDS.filter((b) => activeBrands[b]);
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.some((brand) => product.name.toLowerCase().includes(brand))
      );
    }

    // 2) Price
    filtered = filtered.filter(
      (product) => product.price >= PRICE_MIN && product.price <= sliderValue
    );

    // 3) Availability
    if (inStockActive && !preOrderActive) {
      filtered = filtered.filter((product) => product.inStock !== false);
    } else if (preOrderActive && !inStockActive) {
      filtered = filtered.filter((product) => product.preOrder === true);
    }

    // 4) Sort
    switch (sortBy) {
      case 'name A to Z':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name Z to A':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price decreasing':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'price increasing':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'number of reviews':
        filtered.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      case 'popularity':
      default:
        break;
    }

    return filtered;
  }, [products, activeBrands, sliderValue, inStockActive, preOrderActive, sortBy]);
};
