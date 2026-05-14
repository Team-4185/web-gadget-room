import type { CatalogApiSort, ICheckboxOption, IProduct, SortOption } from '@/core/types';

import { CATALOG_PAGE_SIZE } from '@/core/constants';

const catalogSortMap: Partial<Record<SortOption, CatalogApiSort>> = {
  popularity: 'price_asc',
  new: 'price_asc',
  increase: 'price_asc',
  reduction: 'price_desc',
  'price increasing': 'price_asc',
  'price decreasing': 'price_desc',
};

export const getCatalogApiSort = (sortBy: SortOption): CatalogApiSort =>
  catalogSortMap[sortBy] ?? 'price_asc';

export const getSelectedCatalogBrands = (
  activeItems: Record<string, boolean>,
  brandOptions: ICheckboxOption[]
) => brandOptions.filter((brand) => activeItems[brand.value]).map((brand) => brand.label);

export const sortFallbackCatalogProducts = (products: IProduct[], sortBy: SortOption) => {
  const sortedProducts = [...products];

  if (sortBy === 'increase' || sortBy === 'price increasing') {
    return sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (sortBy === 'reduction' || sortBy === 'price decreasing') {
    return sortedProducts.sort((a, b) => b.price - a.price);
  }

  return sortedProducts;
};

export const getFallbackCatalogProductsPage = ({
  products,
  page,
  sortBy,
  selectedBrands,
  maxPrice,
}: {
  products: IProduct[];
  page: number;
  sortBy: SortOption;
  selectedBrands: string[];
  maxPrice: number;
}) => {
  const filteredProducts = sortFallbackCatalogProducts(products, sortBy).filter((product) => {
    const matchesBrand = selectedBrands.length
      ? selectedBrands.some((brand) => product.name.toLowerCase().includes(brand.toLowerCase()))
      : true;
    const matchesPrice = product.price <= maxPrice;

    return matchesBrand && matchesPrice;
  });
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / CATALOG_PAGE_SIZE));
  const startIndex = (page - 1) * CATALOG_PAGE_SIZE;

  return {
    products: filteredProducts.slice(startIndex, startIndex + CATALOG_PAGE_SIZE),
    totalElements: filteredProducts.length,
    totalPages,
    first: page <= 1,
    last: page >= totalPages,
  };
};
